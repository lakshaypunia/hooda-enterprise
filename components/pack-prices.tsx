import type { Product } from "@/data/products";
import { DISCOUNT_PERCENT } from "@/lib/site-config";
import { formatINR, sellingPrice } from "@/lib/pricing";

/** Price list for every pack size of a product. */
export function PackPrices({ product }: { product: Product }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-deep/6">
      <div className="bg-deep px-5 py-4 text-white">
        <h2 className="text-xl font-bold">Packs & prices</h2>
        <p className="text-sm text-aqua-light">{DISCOUNT_PERCENT}% off MRP on every pack · MRP incl. GST</p>
      </div>
      <ul className="divide-y divide-deep/8">
        {product.packs.map((pack) => (
          <li key={pack.size} className="flex items-center justify-between gap-3 px-5 py-4">
            <span className="font-display text-lg font-semibold text-ink">{pack.size}</span>
            {pack.mrp ? (
              <span className="text-right">
                <span className="block font-display text-xl font-bold text-ink">
                  {formatINR(sellingPrice(pack.mrp))}
                </span>
                <span className="text-sm text-muted">
                  MRP <span className="line-through">{formatINR(pack.mrp)}</span>
                </span>
              </span>
            ) : (
              <span className="font-semibold text-lagoon">Price on request</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
