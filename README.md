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

All settings are `NEXT_PUBLIC_*` env vars (see `.env.example`). They are baked in at
build time, so **redeploy after changing them**.

| Variable | Example | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PHONE_NUMBER` | `8168200335` | Shop phone, shown on the site and used for call links; also the WhatsApp number by default |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | | Optional WhatsApp number for orders if different from the phone |
| `NEXT_PUBLIC_WHATSAPP_QUERY_NUMBER` | | Optional separate WhatsApp number for product questions |
| `NEXT_PUBLIC_SERVICE_AREAS` | `Rohtak,Sonipat,Jhajjar` | Delivery districts, comma-separated (empty hides service-area text) |
| `NEXT_PUBLIC_SERVICE_AREAS_HI` | `रोहतक,सोनीपत,झज्जर` | Same districts in Hindi, same order |
| `NEXT_PUBLIC_SITE_URL` | `https://example.com` | Public URL for SEO; on Vercel defaults to the production domain |
| `NEXT_PUBLIC_SHOW_HINDI` | `false` | Show the English/Hindi switch (Hindi pages exist at `/hi` regardless) |

Pricing rules (discount off MRP) live in `lib/site-config.ts`. Deployment steps are in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Project layout

```
app/[lang]/     routes (English at /, Hindi at /hi), layouts
app/            global styles, sitemap, robots, icons
proxy.ts        locale routing
components/     shared UI (header, footer, WhatsApp button, ...)
data/           product catalogue (typed)
lib/            config, i18n dictionaries, search, WhatsApp, SEO helpers
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
