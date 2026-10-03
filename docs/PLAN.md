# Build Plan

## Goal

A catalogue website for a wholesale aquaculture supplier. Farmers find products by name or by
the problem in their pond, then buy or ask a question on WhatsApp with a pre-filled message.

## Sources

- `Product Booklet 2023.pdf` (English) — composition, indications, dosage, pack sizes, optimal water parameters
- `Product Catalogue Hindi.pdf` — same range in Hindi, with product pack photos
- Provet Pharma price list FY2027 — 63 SKUs with MRP, GST, HSN and SAP codes

## Decisions

- **Pricing:** show MRP struck through, with the selling price at **20% off MRP**
  (`lib/site-config.ts` → `DISCOUNT_PERCENT`).
- **Antibiotics** (OTC, Oxy HCL, Proveflox, Quinacip and similar) are listed as
  "available on enquiry" — no promotional dosage claims, since their aquaculture use is regulated in India.
- **Dosage disclaimer** on every product page: "Use as advised by an aquaculture consultant."
- **Brand assets:** confirm with the owner that they are an authorised dealer and may use Provet logos and pack photos.
- **Hosting:** Vercel, connected to GitHub (preview link per push).

## Search

1. Fuzzy text search (English + Hindi keywords)
2. "What's the problem in your pond?" chips — ammonia/nitrite, low oxygen, parasites,
   vibrio, white feces/gut, moulting, hardness, growth/immunity, pond bottom, algae/snails
3. Filters: species (fish/shrimp), application (water/feed/soil), category, brand
4. Filter state kept in the URL so links can be shared

## WhatsApp

- "Buy on WhatsApp" per product/pack with quantity
- Enquiry basket → one combined message
- "Ask a question" with a separate template
- Floating WhatsApp button on every page

## Pages

Home · /products · /products/[slug] · /water-quality · /about · /contact

## Commit roadmap

1. chore: commit lockfile, add project docs and env example
2. feat(theme): aquatic design tokens, fonts, global styles
3. feat(layout): header, footer, floating WhatsApp button
4. feat(data): product catalogue typed data from booklet + FY2027 price list
5. chore(assets): extract product pack images from catalogue
6. feat(home): underwater hero, problem chips, categories
7. feat(products): catalogue page with fuzzy search and filters
8. feat(products): product detail pages (SSG)
9. feat(whatsapp): prefilled buy/query links + enquiry basket
10. feat(content): water-quality guide, about, contact
11. feat(i18n): Hindi language toggle
12. feat(seo): metadata, sitemap, OG images, product JSON-LD
13. chore: lint, a11y and performance pass

## Later

- Admin page or Google Sheet so the owner can update prices without code
- Google Business Profile, analytics with WhatsApp click tracking

## Open questions for the owner

1. WhatsApp number(s)
2. Business name, logo, address, delivery area, GSTIN, hours
3. Other brands or catalogues beyond Provet / BluNova?
4. Languages beyond English + Hindi?
5. Shop photos and a short story for the About page
