/**
 * Business details and site-wide settings.
 * Values marked TODO are placeholders until confirmed by the owner.
 */
export const siteConfig = {
  name: "Hooda Enterprise",
  tagline: "Healthy ponds, better harvests",
  description:
    "Independent dealer and wholesale supplier of aquaculture health products for fish and shrimp farmers.",
  /** Shown wherever we need to be clear we resell other companies' products. */
  dealerNote:
    "Hooda Enterprise is an independent dealer, not a manufacturer. We source genuine products from trusted brands such as Provet Pharma (BluNova) and sell them to farmers at wholesale prices. Product names and trademarks belong to their manufacturers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  whatsappQueryNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_QUERY_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "919999999999",

  // TODO: confirm with owner
  phoneDisplay: "+91 99999 99999",
  email: "",
  address: "Haryana, India",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM",

  /** Brands we currently stock — display names. See data/brands.ts for details. */
  brands: ["Provet Pharma (BluNova)"],

  nav: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/water-quality", label: "Water Quality" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/** Selling price is MRP minus this percentage. */
export const DISCOUNT_PERCENT = 20;

export const DOSAGE_DISCLAIMER = "Dosages are indicative. Use as advised by an aquaculture consultant.";
