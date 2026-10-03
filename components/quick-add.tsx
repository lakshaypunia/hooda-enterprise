"use client";

import { Plus } from "lucide-react";
import { basket } from "@/lib/basket";

/** Adds a product's first (smallest) pack to the enquiry list from a product card. */
export function QuickAdd({ slug, size, name }: { slug: string; size: string; name: string }) {
  return (
    <button
      type="button"
      onClick={() => basket.add(slug, size)}
      aria-label={`Add ${name} ${size} to enquiry list`}
      title="Add to enquiry list"
      className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-deep text-white shadow-soft transition-transform hover:scale-110 hover:bg-lagoon"
    >
      <Plus className="size-5" />
    </button>
  );
}
