"use client";

import { useState } from "react";
import { MessageCircleQuestion, Minus, Plus, ShoppingBasket } from "lucide-react";
import type { Product } from "@/data/products";
import { basket } from "@/lib/basket";
import { formatINR, sellingPrice } from "@/lib/pricing";
import { DISCOUNT_PERCENT } from "@/lib/site-config";
import { buyMessage, queryMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Pack picker, quantity and WhatsApp actions for a product page. */
export function BuyPanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.packs[0].size);
  const [qty, setQty] = useState(1);
  const pack = product.packs.find((p) => p.size === size) ?? product.packs[0];

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-deep/6">
      <div className="bg-deep px-5 py-4 text-white">
        <h2 className="text-xl font-bold">Packs & prices</h2>
        <p className="text-sm text-aqua-light">{DISCOUNT_PERCENT}% off MRP on every pack · MRP incl. GST</p>
      </div>

      <fieldset className="p-3">
        <legend className="sr-only">Choose a pack size</legend>
        <div className="space-y-2">
          {product.packs.map((p) => {
            const active = p.size === pack.size;
            return (
              <label
                key={p.size}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 transition-colors ${
                  active ? "border-aqua bg-foam" : "border-transparent bg-cream hover:border-aqua/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`pack-${product.slug}`}
                    value={p.size}
                    checked={active}
                    onChange={() => setSize(p.size)}
                    className="size-4 accent-lagoon"
                  />
                  <span className="font-display text-lg font-semibold text-ink">{p.size}</span>
                </span>
                {p.mrp ? (
                  <span className="text-right">
                    <span className="block font-display text-xl font-bold text-ink">
                      {formatINR(sellingPrice(p.mrp))}
                    </span>
                    <span className="text-sm text-muted">
                      MRP <span className="line-through">{formatINR(p.mrp)}</span>
                    </span>
                  </span>
                ) : (
                  <span className="font-semibold text-lagoon">Price on request</span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-3 border-t border-deep/8 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display font-semibold text-ink">Quantity</span>
          <QtyStepper value={qty} onChange={setQty} label={`${product.name} ${pack.size}`} />
        </div>
        {pack.mrp && (
          <p className="flex items-baseline justify-between text-muted">
            <span>Total</span>
            <span className="font-display text-2xl font-bold text-ink">
              {formatINR(sellingPrice(pack.mrp) * qty)}
            </span>
          </p>
        )}

        <a
          href={whatsappLink(buyMessage(product, pack, qty))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-lg font-bold text-abyss transition-transform hover:scale-[1.02]"
        >
          <WhatsAppIcon className="size-6" /> Buy on WhatsApp
        </a>
        <button
          type="button"
          onClick={() => basket.add(product.slug, pack.size, qty)}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-deep/15 px-5 py-3 font-semibold text-ink transition-colors hover:border-aqua hover:bg-foam"
        >
          <ShoppingBasket className="size-5" /> Add to enquiry list
        </button>
        <a
          href={whatsappLink(queryMessage(product), "query")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 py-1 text-sm font-semibold text-lagoon hover:text-deep"
        >
          <MessageCircleQuestion className="size-4" /> Ask a question about this product
        </a>
      </div>
    </section>
  );
}

export function QtyStepper({
  value,
  onChange,
  label,
  size = "md",
}: {
  value: number;
  onChange: (qty: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "size-8" : "size-10";
  return (
    <div className="inline-flex items-center rounded-full bg-cream ring-1 ring-deep/10">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label={`Decrease quantity of ${label}`}
        className={`grid ${btn} place-items-center rounded-full text-ink hover:bg-white disabled:opacity-40`}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
        aria-label={`Quantity of ${label}`}
        className="w-12 [appearance:textfield] bg-transparent text-center font-display text-lg font-semibold text-ink focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity of ${label}`}
        className={`grid ${btn} place-items-center rounded-full text-ink hover:bg-white`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
