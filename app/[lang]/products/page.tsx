import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/data/products";
import { Catalogue } from "@/components/catalogue";
import { PageBanner } from "@/components/page-banner";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { DISCOUNT_PERCENT } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/products", {
    title: t.meta.productsTitle,
    description: t.meta.productsDescription,
  });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { t } = await getLocale(params);
  return (
    <main className="flex-1 pb-4">
      <PageBanner eyebrow={t.catalogue.eyebrow} title={t.catalogue.title}>
        {t.catalogue.intro(products.length, DISCOUNT_PERCENT)}
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
