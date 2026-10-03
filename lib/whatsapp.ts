import type { Pack, Product } from "@/data/products";
import { formatINR, sellingPrice } from "./pricing";
import { siteConfig } from "./site-config";

type Kind = "buy" | "query";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string, kind: Kind = "buy") {
  const number = kind === "query" ? siteConfig.whatsappQueryNumber : siteConfig.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_ENQUIRY_MESSAGE = `Hello ${siteConfig.name}, I found your website and would like to know more about your aquaculture products.`;

const productUrl = (product: Product) => `${siteConfig.url}/products/${product.slug}`;

const priceNote = (pack: Pack) =>
  pack.mrp ? `${formatINR(sellingPrice(pack.mrp))} each (MRP ${formatINR(pack.mrp)})` : "price on request";

export function buyMessage(product: Product, pack: Pack, qty: number) {
  return [
    `Hello ${siteConfig.name}, I want to buy:`,
    ``,
    `*${product.name}* — ${pack.size} × ${qty}`,
    `Website price: ${priceNote(pack)}`,
    ``,
    `Please confirm availability and delivery.`,
    productUrl(product),
  ].join("\n");
}

export function queryMessage(product: Product) {
  return [
    `Hello ${siteConfig.name}, I have a question about *${product.name}*.`,
    ``,
    `My pond: (fish / shrimp, area in acres, problem you are facing)`,
    ``,
    productUrl(product),
  ].join("\n");
}

export type BasketLine = { product: Product; pack: Pack; qty: number };

export function basketMessage(lines: BasketLine[], customer: { name?: string; location?: string }) {
  let total = 0;
  let unpriced = false;
  const rows = lines.map(({ product, pack, qty }, i) => {
    if (pack.mrp) total += sellingPrice(pack.mrp) * qty;
    else unpriced = true;
    const price = pack.mrp ? ` — ${formatINR(sellingPrice(pack.mrp) * qty)}` : " — price on request";
    return `${i + 1}. *${product.name}* ${pack.size} × ${qty}${price}`;
  });

  return [
    `Hello ${siteConfig.name}, I want to order:`,
    ``,
    ...rows,
    ``,
    `Estimated total: ${formatINR(total)}${unpriced ? " + items on request" : ""}`,
    customer.name ? `Name: ${customer.name}` : "",
    customer.location ? `Location: ${customer.location}` : "",
    ``,
    `Please confirm availability and delivery.`,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}
