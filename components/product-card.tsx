import Link from "next/link";
import { lowestMrp, type Product } from "@/data/products";
import { categories, species as speciesLabels } from "@/data/taxonomy";
import { PriceTag } from "./price-tag";
import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: Product }) {
  const mrp = lowestMrp(product);
  const multiplePacks = product.packs.length > 1;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-drop border border-deep/8 bg-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow">
      <ProductImage
        product={product}
        sizes="(min-width: 1024px) 280px, 50vw"
        className="border-b border-deep/6"
      />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold tracking-wide text-lagoon uppercase sm:text-xs">
          {categories[product.category].short}
        </p>
        <h3 className="mt-1 text-lg leading-tight font-bold text-ink sm:text-xl">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
          <span className="block text-sm font-medium text-muted sm:ml-2 sm:inline sm:align-middle">{product.nameHi}</span>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted sm:text-[15px]">{product.tagline}</p>

        <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {product.species.map((s) => (
            <span key={s} className="rounded-full bg-foam px-2.5 py-0.5 text-xs font-medium text-deep">
              {speciesLabels[s].label}
            </span>
          ))}
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-ink/70">
            {product.packs.map((p) => p.size).join(" · ")}
          </span>
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          <PriceTag mrp={mrp} prefix={mrp && multiplePacks ? "From" : undefined} />
        </div>
      </div>
    </article>
  );
}
