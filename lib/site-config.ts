/**
 * Business details and site-wide settings.
 *
 * Contact details and service area come from NEXT_PUBLIC_* env vars (see .env.example).
 * They are inlined at build time, so redeploy after changing them on Vercel.
 * Each `process.env.NEXT_PUBLIC_…` must stay a literal reference for Next to inline it.
 */

const clean = (value: string | undefined) => value?.trim() || "";

/** Digits only, with India's 91 prefix added to 10-digit numbers. */
function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

/** "918168200335" -> "+91 81682 00335". */
function formatPhone(digits: string) {
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return digits ? `+${digits}` : "";
}

const list = (value: string) =>
  value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const PLACEHOLDER_PHONE = "919999999999";

const phone = phoneDigits(clean(process.env.NEXT_PUBLIC_PHONE_NUMBER)) || PLACEHOLDER_PHONE;
const whatsapp = phoneDigits(clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)) || phone;
const serviceAreas = list(clean(process.env.NEXT_PUBLIC_SERVICE_AREAS));
const serviceAreasHi = list(clean(process.env.NEXT_PUBLIC_SERVICE_AREAS_HI));

const vercelUrl = clean(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL);

export const siteConfig = {
  name: "Hooda Enterprise",
  tagline: "Healthy ponds, better harvests",
  description:
    "Independent dealer and wholesale supplier of aquaculture health products for fish and shrimp farmers.",
  /** Explicit URL wins; on Vercel falls back to the production domain. */
  url:
    clean(process.env.NEXT_PUBLIC_SITE_URL) || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),

  phone,
  phoneDisplay: formatPhone(phone),
  whatsappNumber: whatsapp,
  whatsappQueryNumber: phoneDigits(clean(process.env.NEXT_PUBLIC_WHATSAPP_QUERY_NUMBER)) || whatsapp,

  /** Districts we deliver to. Empty list hides all service-area text. */
  serviceAreas,
  serviceAreasHi: serviceAreasHi.length === serviceAreas.length ? serviceAreasHi : serviceAreas,

  // TODO: confirm with owner
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

/** "Rohtak, Sonipat and Jhajjar" / "रोहतक, सोनीपत और झज्जर" — empty string when not configured. */
export function serviceAreaText(lang: "en" | "hi") {
  const areas = lang === "hi" ? siteConfig.serviceAreasHi : siteConfig.serviceAreas;
  if (!areas.length) return "";
  return new Intl.ListFormat(lang === "hi" ? "hi-IN" : "en-IN", { type: "conjunction" }).format(areas);
}

/**
 * Hindi pages are built at /hi/… but the header switch stays hidden until the
 * Hindi copy has been reviewed. Set NEXT_PUBLIC_SHOW_HINDI=true to show it.
 */
export const SHOW_LANGUAGE_SWITCH = process.env.NEXT_PUBLIC_SHOW_HINDI === "true";

/** Selling price is MRP minus this percentage. */
export const DISCOUNT_PERCENT = 20;
