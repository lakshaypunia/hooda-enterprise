"use client";

import { formatINR, sellingPrice } from "@/lib/pricing";
import { DISCOUNT_PERCENT } from "@/lib/site-config";
import { useI18n } from "./i18n-provider";

type Props = {
  mrp?: number;
  /** Show "From" when this is the lowest price across several packs. */
  from?: boolean;
  size?: "sm" | "lg";
};

/** Selling price with MRP struck through, or "Price on request". */
export function PriceTag({ mrp, from, size = "sm" }: Props) {
  const { t } = useI18n();

  if (!mrp) {
    return (
      <p className={`font-semibold text-lagoon ${size === "lg" ? "text-xl" : "text-sm sm:text-base"}`}>
        {t.common.priceOnRequest}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {from && <span className="text-sm text-muted">{t.common.from}</span>}
      <span
        className={`font-display font-bold text-ink ${size === "lg" ? "text-3xl" : "text-lg sm:text-xl"}`}
      >
        {formatINR(sellingPrice(mrp))}
      </span>
      <span className="text-sm text-muted line-through" aria-label={`${t.common.mrp} ${formatINR(mrp)}`}>
        {formatINR(mrp)}
      </span>
      <span className="rounded-full bg-coral/12 px-2 py-0.5 text-xs font-bold text-coral-dark">
        {t.common.off(DISCOUNT_PERCENT)}
      </span>
    </div>
  );
}
