/**
 * Business details and site-wide settings.
 * Values marked TODO are placeholders until confirmed by the owner.
 */
export const siteConfig = {
  name: "Hooda Enterprise",
  tagline: "Healthy ponds, better harvests",
  description:
    "Independent dealer and wholesale supplier of aquaculture health products for fish and shrimp farmers.",
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
  addressHi: "हरियाणा, भारत",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  hoursHi: "सोम–शनि, सुबह 9 से शाम 7 बजे तक",

  /** Brands we currently stock — display names. See data/brands.ts for details. */
  brands: ["Provet Pharma (BluNova)"],

  /** Labels come from the dictionary (t.nav[key]). */
  nav: [
    { href: "/", key: "home" },
    { href: "/products", key: "products" },
    { href: "/water-quality", key: "water" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ],
} as const;

/**
 * Hindi pages are built at /hi/… but the header switch stays hidden until the
 * Hindi copy has been reviewed. Set NEXT_PUBLIC_SHOW_HINDI=true to show it.
 */
export const SHOW_LANGUAGE_SWITCH = process.env.NEXT_PUBLIC_SHOW_HINDI === "true";

/** Selling price is MRP minus this percentage. */
export const DISCOUNT_PERCENT = 20;
