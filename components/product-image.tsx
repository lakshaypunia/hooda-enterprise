import Image from "next/image";
import { productImage } from "@/lib/product-image";
import type { Product } from "@/data/products";

type Props = {
  product: Pick<Product, "slug" | "name" | "nameHi">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Pack photo on white, or a themed placeholder when no photo is available yet. */
export function ProductImage({ product, sizes, priority, className = "" }: Props) {
  const src = productImage(product.slug);

  if (src) {
    return (
      <div className={`relative aspect-square overflow-hidden bg-white ${className}`}>
        <Image
          src={src}
          alt={`${product.name} pack`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-3"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative grid aspect-square place-items-center overflow-hidden bg-underwater text-center text-white ${className}`}
    >
      <div aria-hidden className="absolute inset-0 caustics opacity-70" />
      <svg
        aria-hidden
        viewBox="0 0 120 60"
        className="absolute bottom-6 left-1/2 w-1/2 -translate-x-1/2 text-white/10"
      >
        <path
          fill="currentColor"
          d="M5 30c18-18 45-24 70-18 12 3 22 9 30 16l12-10v24l-12-10c-8 7-18 13-30 16-25 6-52 0-70-18z"
        />
      </svg>
      <div className="relative px-4">
        <p className="font-display text-xl leading-tight font-bold sm:text-2xl">{product.name}</p>
        <p className="mt-1 text-sm text-aqua-light">{product.nameHi}</p>
      </div>
    </div>
  );
}
