import { DISCOUNT_PERCENT } from "@/lib/site-config";
import { formatINR, sellingPrice } from "@/lib/pricing";

type Props = {
  mrp?: number;
  /** Prefix such as "From" when showing the lowest price across packs. */
  prefix?: string;
  size?: "sm" | "lg";
};

/** Selling price with MRP struck through, or "Price on request". */
export function PriceTag({ mrp, prefix, size = "sm" }: Props) {
  if (!mrp) {
    return (
      <p className={`font-semibold text-lagoon ${size === "lg" ? "text-xl" : "text-sm sm:text-base"}`}>
        Price on request
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {prefix && <span className="text-sm text-muted">{prefix}</span>}
      <span className={`font-display font-bold text-ink ${size === "lg" ? "text-3xl" : "text-lg sm:text-xl"}`}>
        {formatINR(sellingPrice(mrp))}
      </span>
      <span className="text-sm text-muted line-through" aria-label={`MRP ${formatINR(mrp)}`}>
        {formatINR(mrp)}
      </span>
      <span className="rounded-full bg-coral/12 px-2 py-0.5 text-xs font-bold text-coral-dark">
        {DISCOUNT_PERCENT}% OFF
      </span>
    </div>
  );
}
