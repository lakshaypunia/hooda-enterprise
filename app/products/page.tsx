import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/data/products";
import { Catalogue } from "@/components/catalogue";
import { Wave } from "@/components/icons";
import { Bubbles } from "@/components/underwater";
import { DISCOUNT_PERCENT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse probiotics, zeolites, oxygen supplements, disinfectants, minerals and feed additives for fish and shrimp ponds. Search by pond problem and order on WhatsApp.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 pb-4">
      <section className="relative isolate overflow-hidden bg-underwater text-white">
        <div aria-hidden className="absolute inset-0 caustics" />
        <Bubbles />
        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16">
          <p className="font-display text-sm font-semibold tracking-widest text-aqua-light uppercase">
            Product catalogue
          </p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Find the right product for your pond</h1>
          <p className="mt-3 max-w-2xl text-lg text-foam/85">
            {products.length} products for fish and shrimp farming. Every price is {DISCOUNT_PERCENT}% below MRP.
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 h-12 w-full text-cream sm:h-16" />
      </section>

      {/* useSearchParams needs a Suspense boundary so the rest of the page can be prerendered. */}
      <Suspense fallback={<CatalogueFallback />}>
        <Catalogue />
      </Suspense>
    </main>
  );
}

function CatalogueFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="relative -mt-10 h-64 animate-pulse rounded-[1.75rem] bg-white shadow-soft" />
    </div>
  );
}
