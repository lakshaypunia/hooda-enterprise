"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { basket } from "@/lib/basket";
import { useI18n } from "./i18n-provider";

/** Adds a product's first (smallest) pack to the enquiry list from a product card. */
export function QuickAdd({ product }: { product: Product }) {
  const { t } = useI18n();
  const size = product.packs[0].size;
  return (
    <button
      type="button"
      onClick={() => basket.add(product.slug, size)}
      aria-label={t.product.quickAdd(`${product.name} ${size}`)}
      title={t.product.quickAddTitle}
      className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-deep text-white shadow-soft transition-transform hover:scale-110 hover:bg-lagoon"
    >
      <Plus className="size-5" />
    </button>
  );
}
