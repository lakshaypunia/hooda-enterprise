import { siteConfig } from "./site-config";

type Kind = "buy" | "query";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string, kind: Kind = "buy") {
  const number = kind === "query" ? siteConfig.whatsappQueryNumber : siteConfig.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_ENQUIRY_MESSAGE = `Hello ${siteConfig.name}, I found your website and would like to know more about your aquaculture products.`;
