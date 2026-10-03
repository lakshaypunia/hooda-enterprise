/**
 * Manufacturers whose products we stock. Hooda Enterprise is an independent dealer —
 * it sources these products and resells them; it does not manufacture them.
 * Add a new entry here when stocking another brand, then use its key as `Product.brand`.
 */
export const brands = {
  "Provet BluNova": {
    manufacturer: "Provet Pharma Pvt. Ltd.",
    range: "BluNova aquaculture range",
    website: "https://provet.in",
  },
} as const satisfies Record<string, { manufacturer: string; range: string; website: string }>;

export type BrandKey = keyof typeof brands;
