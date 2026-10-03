"""
Extract product pack photos from the Hindi product catalogue PDF.

Each catalogue page shows two products (top and bottom half). The pack photo is an
embedded image with a transparency mask, so we composite it onto a white 500x500
square to match across products.

Writes:
  public/products/<slug>.webp
  data/image-sources.json   (which page each image came from)

Usage:
  pip install pymupdf pillow
  python scripts/extract-catalogue-images.py "../Product Catalogue Hindi.pdf"
"""

import io
import json
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "products"
SOURCES_JSON = ROOT / "data" / "image-sources.json"

SIZE = 500  # output square, px
FILL = 420  # longest side of the pack inside the square, px
SCALE = 8  # px per PDF point when compositing multi-image packs

# page index (0-based) -> (top product slug, bottom product slug)
# None = no product we sell (cover, back page, or a discontinued item).
PAGES = {
    1: ("aquabac", "bacitox-plus"),
    2: ("rhodobac", "fepromix"),
    3: ("benzatec-80", None),  # bottom: Profect Aquatic, replaced by Profect Plus
    4: ("zeomin", "zeomin-forte"),
    5: ("minblend", "mipramax"),
    6: ("dissox", "syngromix"),
    7: ("vibrocid", "pathostat-blu"),
    8: ("mintroplex-gold", "orbigel-hp"),
    9: ("yeaforte-plus", "nagrowall"),
    10: ("dynablend", "nitrisol-hp"),
    11: ("raprosoft", "ceemax"),
    12: ("envipro-gold", None),
}


def load_rgba(doc, xref, smask):
    rgb = Image.open(io.BytesIO(doc.extract_image(xref)["image"])).convert("RGB")
    mask = Image.open(io.BytesIO(doc.extract_image(smask)["image"])).convert("L")
    img = rgb.convert("RGBA")
    img.putalpha(mask.resize(rgb.size))
    return img


def extract(doc, page_index, bottom):
    page = doc[page_index]
    smasks = {img[0]: img[1] for img in page.get_images(full=True)}
    mid = page.rect.height / 2
    items = [
        info
        for info in page.get_image_info(xrefs=True)
        if info["xref"] and smasks.get(info["xref"]) and (info["bbox"][1] >= mid) == bottom
    ]
    if not items:
        return None

    # Some packs (e.g. Rhodobac) are several images side by side; composite them.
    x0 = min(i["bbox"][0] for i in items)
    y0 = min(i["bbox"][1] for i in items)
    x1 = max(i["bbox"][2] for i in items)
    y1 = max(i["bbox"][3] for i in items)
    canvas = Image.new("RGBA", (round((x1 - x0) * SCALE), round((y1 - y0) * SCALE)))
    for info in items:
        b = info["bbox"]
        img = load_rgba(doc, info["xref"], smasks[info["xref"]])
        size = (round((b[2] - b[0]) * SCALE), round((b[3] - b[1]) * SCALE))
        pos = (round((b[0] - x0) * SCALE), round((b[1] - y0) * SCALE))
        canvas.alpha_composite(img.resize(size, Image.LANCZOS), pos)

    canvas = canvas.crop(canvas.getbbox())
    ratio = FILL / max(canvas.size)
    canvas = canvas.resize((round(canvas.width * ratio), round(canvas.height * ratio)), Image.LANCZOS)
    out = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 255))
    out.alpha_composite(canvas, ((SIZE - canvas.width) // 2, (SIZE - canvas.height) // 2))
    source_px = max(max(i["width"], i["height"]) for i in items)
    return out.convert("RGB"), source_px


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    pdf = Path(sys.argv[1])
    doc = fitz.open(pdf)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    sources = {}
    for page_index, slugs in PAGES.items():
        for bottom, slug in enumerate(slugs):
            if not slug:
                continue
            result = extract(doc, page_index, bool(bottom))
            if not result:
                print(f"no image found for {slug} (page {page_index + 1})")
                continue
            img, source_px = result
            img.save(OUT_DIR / f"{slug}.webp", quality=88)
            sources[slug] = {
                "source": "catalogue",
                "file": pdf.name,
                "page": page_index + 1,
                "sourcePx": source_px,
            }
            print(f"{slug:18} page {page_index + 1:2}  source {source_px}px")

    SOURCES_JSON.write_text(json.dumps(dict(sorted(sources.items())), indent=2) + "\n", encoding="utf-8")
    print(f"\n{len(sources)} images -> {OUT_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
