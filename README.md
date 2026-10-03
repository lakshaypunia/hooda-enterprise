# Hooda Enterprise — Aquaculture Products

Website for **Hooda Enterprise**, a wholesale supplier of aquaculture health products
(Provet Pharma, BluNova) for fish and shrimp farmers. Customers browse the catalogue,
search by the problem in their pond, and order or ask questions directly on WhatsApp.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Static product data in `data/` — no database

## Getting started

```bash
cp .env.example .env.local   # then set the real WhatsApp number
npm install
npm run dev
```

Open <http://localhost:3000>.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number that receives buy requests (digits only, with country code, e.g. `919812345678`) |
| `NEXT_PUBLIC_WHATSAPP_QUERY_NUMBER` | Optional separate number for product queries |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for SEO metadata |

Pricing rules (discount off MRP) live in `lib/site-config.ts`.

## Project layout

```
app/            routes, layouts, global styles
components/     shared UI (header, footer, WhatsApp button, ...)
data/           product catalogue (typed)
lib/            config and helpers
public/products product pack images
docs/PLAN.md    build plan and commit roadmap
```

## Updating products or prices

All products live in `data/products.ts`. Each pack has its own MRP; the selling price
is calculated from the MRP using the discount in `lib/site-config.ts`.

## Product images

Pack photos are extracted from the Hindi product catalogue PDF (kept outside the repo):

```bash
pip install pymupdf pillow
npm run images:extract   # writes public/products/*.webp and data/image-sources.json
npm run images:report    # regenerates docs/IMAGE_SOURCES.md
```

`docs/IMAGE_SOURCES.md` lists every product, where its image came from, and which
products still need a photo.
