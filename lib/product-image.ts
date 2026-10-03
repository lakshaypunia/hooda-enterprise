import imageSources from "@/data/image-sources.json";

type ImageSource = (typeof imageSources)[keyof typeof imageSources];

const sources: Record<string, ImageSource | undefined> = imageSources;

/**
 * Pack photo for a product, or undefined when we don't have one yet
 * (the UI shows a themed placeholder instead).
 * Images are produced by scripts/extract-catalogue-images.py.
 */
export function productImage(slug: string) {
  return sources[slug] ? `/products/${slug}.webp` : undefined;
}
