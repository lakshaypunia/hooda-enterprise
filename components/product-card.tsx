"use client";

import Link from "next/link";
import { lowestMrp, type Product } from "@/data/products";
import { productNames, productTagline } from "@/data/products-hi";
import { categoryText, speciesLabel } from "@/data/taxonomy";
import { useI18n } from "./i18n-provider";
import { PriceTag } from "./price-tag";
import { ProductImage } from "./product-image";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  const { lang, href } = useI18n();
  const mrp = lowestMrp(product);
  const names = productNames(product, lang);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-drop border border-deep/8 bg-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow">
      <ProductImage
        product={product}
        sizes="(min-width: 1024px) 280px, 50vw"
        className="border-b border-deep/6"
      />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold tracking-wide text-lagoon uppercase sm:text-xs">
          {categoryText(product.category, lang).short}
        </p>
        <h3 className="mt-1 text-lg leading-tight font-bold text-ink sm:text-xl">
          <Link href={href(`/products/${product.slug}`)} className="after:absolute after:inset-0">
            {names.primary}
          </Link>
          <span className="block text-sm font-medium text-muted sm:ml-2 sm:inline sm:align-middle">
            {names.secondary}
          </span>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted sm:text-[15px]">
          {productTagline(product, lang)}
        </p>

        <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {product.species.map((s) => (
            <span key={s} className="rounded-full bg-foam px-2.5 py-0.5 text-xs font-medium text-deep">
              {speciesLabel(s, lang)}
            </span>
          ))}
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-ink/70">
            {product.packs.map((p) => p.size).join(" · ")}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:pt-4">
          <PriceTag mrp={mrp} from={!!mrp && product.packs.length > 1} />
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
