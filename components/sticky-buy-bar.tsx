"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { productNames } from "@/data/products-hi";
import { formatINR, sellingPrice } from "@/lib/pricing";
import { buyMessage, whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "./i18n-provider";
import { WhatsAppIcon } from "./icons";

/**
 * Phone-only bar pinned to the bottom of product pages once the buy panel
 * (#buy) has scrolled out of view above, so the order button is always at hand.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const panel = document.getElementById("buy");
    if (!panel) return;
    const onScroll = () => setVisible(panel.getBoundingClientRect().bottom < 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pack = product.packs[0];

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-deep/10 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-15px_rgb(6_42_51/0.35)] backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <a href="#buy" tabIndex={visible ? 0 : -1} className="min-w-0 flex-1">
          <span className="block truncate font-display font-bold text-ink">
            {productNames(product, lang).primary} · {pack.size}
          </span>
          <span className="text-sm text-muted">
            {pack.mrp ? (
              <>
                <strong className="text-ink">{formatINR(sellingPrice(pack.mrp))}</strong>{" "}
                <span className="line-through">{formatINR(pack.mrp)}</span>
              </>
            ) : (
              t.common.priceOnRequest
            )}
          </span>
        </a>
        <a
          href={whatsappLink(buyMessage(product, pack, 1, lang))}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 font-bold text-abyss"
        >
          <WhatsAppIcon className="size-5" /> {t.product.buy}
        </a>
      </div>
    </div>
  );
}
