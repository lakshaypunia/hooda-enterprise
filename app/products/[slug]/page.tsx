import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Atom, Check, ChevronRight, FlaskConical, Info, ListChecks } from "lucide-react";
import { brands } from "@/data/brands";
import { getProduct, products, type Product } from "@/data/products";
import { applications, categories, problems, species } from "@/data/taxonomy";
import { DOSAGE_DISCLAIMER } from "@/lib/site-config";
import { BuyPanel } from "@/components/buy-panel";
import { Wave } from "@/components/icons";
import { ProblemIcon } from "@/components/problem-icon";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Bubbles } from "@/components/underwater";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-underwater text-white">
        <div aria-hidden className="absolute inset-0 caustics" />
        <Bubbles />
        <div className="relative mx-auto max-w-6xl px-4 pt-6 pb-20 sm:px-6 sm:pb-24">
          <nav aria-label="Breadcrumb" className="text-sm text-foam/75">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              <li>
                <Link href={`/products?category=${product.category}`} className="hover:text-white">
                  {categories[product.category].label}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:gap-12">
            <div className="mx-auto w-full max-w-[340px] md:max-w-none">
              <div className="rounded-drop bg-white p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] ring-4 ring-white/15">
                <ProductImage
                  product={product}
                  sizes="(min-width: 768px) 420px, 340px"
                  priority
                  className="rounded-[1.8rem_1.8rem_1.8rem_0.4rem]"
                />
              </div>
            </div>

            <div>
              <p className="font-display text-sm font-semibold tracking-widest text-aqua-light uppercase">
                {brands[product.brand].range} · by {brands[product.brand].manufacturer}
              </p>
              <h1 className="mt-1 text-4xl leading-tight font-extrabold sm:text-5xl">
                {product.name}
                <span className="mt-1 block font-display text-2xl font-semibold text-aqua-light sm:text-3xl">
                  {product.nameHi}
                </span>
              </h1>
              <p className="mt-3 text-lg text-foam/90 sm:text-xl">{product.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.species.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-white/12 px-3 py-1 text-sm font-medium ring-1 ring-white/15"
                  >
                    {species[s].label}
                  </li>
                ))}
                {product.applications.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-aqua/20 px-3 py-1 text-sm font-medium text-aqua-light"
                  >
                    {applications[a].label}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-xl text-foam/85">{product.description}</p>
            </div>
          </div>
        </div>
        <Wave className="absolute bottom-0 left-0 h-12 w-full text-cream sm:h-16" />
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8 lg:col-start-1 lg:row-start-1">
          <Benefits product={product} />
          <Dosage product={product} />
          <Composition product={product} />
          <UsedFor product={product} />
        </div>

        <aside className="order-first lg:order-none lg:col-start-2 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <BuyPanel product={product} />
          </div>
        </aside>
      </div>

      <Related product={product} />
    </main>
  );
}

function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-5 shadow-soft ring-1 ring-deep/6 sm:p-7">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
        <span className="grid size-10 place-items-center rounded-drop bg-foam text-lagoon">{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Benefits({ product }: { product: Product }) {
  return (
    <Card icon={<ListChecks className="size-5" />} title="Benefits">
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {product.benefits.map((b) => (
          <li key={b} className="flex gap-2.5">
            <Check className="mt-0.5 size-5 shrink-0 rounded-full bg-kelp/15 p-0.5 text-kelp" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Dosage({ product }: { product: Product }) {
  return (
    <Card icon={<FlaskConical className="size-5" />} title="Dosage">
      <div className="space-y-5">
        {product.dosage.map((group, i) => (
          <div key={i}>
            {group.title && (
              <h3 className="mb-2 font-display text-lg font-semibold text-deep">{group.title}</h3>
            )}
            <dl className="divide-y divide-deep/8 overflow-hidden rounded-2xl ring-1 ring-deep/8">
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-4 py-3 odd:bg-cream sm:grid-cols-[minmax(0,2fr)_3fr] sm:gap-4"
                >
                  <dt className="font-medium text-muted">{row.label}</dt>
                  <dd className="font-semibold text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      {product.method && (
        <p className="mt-5 rounded-2xl bg-foam p-4 text-deep">
          <strong className="font-semibold">How to apply: </strong>
          {product.method}
        </p>
      )}
      <p className="mt-4 flex gap-2 text-sm text-muted">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {DOSAGE_DISCLAIMER}
      </p>
    </Card>
  );
}

function Composition({ product }: { product: Product }) {
  return (
    <Card icon={<Atom className="size-5" />} title="Composition">
      <p className="text-ink/85">{product.composition}</p>
    </Card>
  );
}

function UsedFor({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-ink">Helps with</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {product.problems.map((slug) => (
          <li key={slug}>
            <Link
              href={`/products?problem=${slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-deep/12 bg-white px-4 py-2 font-medium text-ink transition-colors hover:border-aqua hover:bg-foam"
            >
              <ProblemIcon problem={slug} className="size-4 text-lagoon" />
              {problems[slug].label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Related({ product }: { product: Product }) {
  // Rank by shared problems, then same category.
  const related = products
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({
      p,
      score:
        p.problems.filter((s) => product.problems.includes(s)).length * 2 +
        (p.category === product.category ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.p);

  if (!related.length) return null;

  return (
    <section className="bg-scales">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold text-ink">Often used together</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
