import type { Pack, Product } from "@/data/products";
import { getDictionary, localePath, type Locale } from "./i18n";
import { formatINR, sellingPrice } from "./pricing";
import { siteConfig } from "./site-config";

type Kind = "buy" | "query";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string, kind: Kind = "buy") {
  const number = kind === "query" ? siteConfig.whatsappQueryNumber : siteConfig.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = (lang: Locale) => getDictionary(lang).wa.general(siteConfig.name);

const productUrl = (product: Product, lang: Locale) =>
  `${siteConfig.url}${localePath(lang, `/products/${product.slug}`)}`;

export function buyMessage(product: Product, pack: Pack, qty: number, lang: Locale) {
  const w = getDictionary(lang).wa;
  const price = pack.mrp
    ? `${formatINR(sellingPrice(pack.mrp))} ${w.each} (MRP ${formatINR(pack.mrp)})`
    : w.onRequest;
  return [
    w.buyIntro(siteConfig.name),
    ``,
    `*${product.name}* — ${pack.size} × ${qty}`,
    `${w.websitePrice}: ${price}`,
    ``,
    w.confirm,
    productUrl(product, lang),
  ].join("\n");
}

export function queryMessage(product: Product, lang: Locale) {
  const w = getDictionary(lang).wa;
  return [w.queryIntro(siteConfig.name, product.name), ``, w.queryPond, ``, productUrl(product, lang)].join(
    "\n",
  );
}

export type BasketLine = { product: Product; pack: Pack; qty: number };

export function basketMessage(
  lines: BasketLine[],
  customer: { name?: string; location?: string },
  lang: Locale,
) {
  const w = getDictionary(lang).wa;
  let total = 0;
  let unpriced = false;
  const rows = lines.map(({ product, pack, qty }, i) => {
    if (pack.mrp) total += sellingPrice(pack.mrp) * qty;
    else unpriced = true;
    const price = pack.mrp ? ` — ${formatINR(sellingPrice(pack.mrp) * qty)}` : ` — ${w.onRequest}`;
    return `${i + 1}. *${product.name}* ${pack.size} × ${qty}${price}`;
  });

  const details = [
    customer.name && `${w.name}: ${customer.name}`,
    customer.location && `${w.location}: ${customer.location}`,
  ].filter(Boolean);

  return [
    w.orderIntro(siteConfig.name),
    ``,
    ...rows,
    ``,
    `${w.estimated}: ${formatINR(total)}${unpriced ? w.plusOnRequest : ""}`,
    ...details,
    ``,
    w.confirm,
  ].join("\n");
}
