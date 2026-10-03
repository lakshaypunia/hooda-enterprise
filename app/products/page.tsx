import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/data/products";
import { Catalogue } from "@/components/catalogue";
import { PageBanner } from "@/components/page-banner";
import { DISCOUNT_PERCENT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse probiotics, zeolites, oxygen supplements, disinfectants, minerals and feed additives for fish and shrimp ponds. Search by pond problem and order on WhatsApp.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 pb-4">
      <PageBanner eyebrow="Product catalogue" title="Find the right product for your pond">
        {products.length} products for fish and shrimp farming. Every price is {DISCOUNT_PERCENT}% below MRP.
      </PageBanner>

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
