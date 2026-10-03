import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  MessageCircle,
  PackageCheck,
  Search,
  Stethoscope,
  Truck,
} from "lucide-react";
import { brands } from "@/data/brands";
import { getProduct, products, type Product } from "@/data/products";
import {
  categories,
  categoryText,
  problems,
  problemText,
  type CategorySlug,
  type ProblemSlug,
} from "@/data/taxonomy";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { DISCOUNT_PERCENT, serviceAreaText, siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { Wave, WhatsAppIcon } from "@/components/icons";
import { ProblemIcon } from "@/components/problem-icon";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Bubbles, PondLife } from "@/components/underwater";

const FEATURED = [
  "bacitox-plus",
  "zeomin",
  "pathostat-blu",
  "nagrowall",
  "dissox",
  "mintroplex-gold",
  "rhodobac",
  "vibrocid",
];

const CATEGORY_COVERS: Record<CategorySlug, string> = {
  probiotics: "aquabac",
  "ammonia-control": "dynablend",
  zeolites: "zeomin-forte",
  oxygen: "dissox",
  disinfectants: "benzatec-80",
  minerals: "minblend",
  "feed-additives": "syngromix",
  immunity: "nagrowall",
  "parasite-control": "argucide",
  "water-balancers": "raprosoft",
};

const featured = FEATURED.map((slug) => getProduct(slug)).filter((p): p is Product => !!p);

const countBy = <K extends string>(key: (p: Product) => K | K[]) => {
  const counts = {} as Record<K, number>;
  for (const p of products) {
    for (const k of ([] as K[]).concat(key(p))) counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
};

const categoryCounts = countBy((p) => p.category);
const problemCounts = countBy((p) => p.problems);

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/", { title: t.meta.siteTitle, description: t.meta.siteDescription });
}

type SectionProps = { lang: Locale; t: Dictionary; href: (path: string) => string };

export default async function Home({ params }: PageProps<"/[lang]">) {
  const ctx = await getLocale(params);
  return (
    <main>
      <Hero {...ctx} />
      <ProblemFinder {...ctx} />
      <Categories {...ctx} />
      <Featured {...ctx} />
      <Brands {...ctx} />
      <WhyUs {...ctx} />
      <HowToOrder {...ctx} />
    </main>
  );
}

function Hero({ lang, t, href }: SectionProps) {
  const h = t.home;
  return (
    <section className="relative isolate overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <Bubbles />
      <PondLife />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 sm:pb-36 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-sm text-aqua-light backdrop-blur">
            <span className="size-2 rounded-full bg-whatsapp" />
            {serviceAreaText(lang) ? t.area.chip(serviceAreaText(lang)) : h.heroChip}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-extrabold sm:text-6xl">
            {h.heroTitle1}
            <br />
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-aqua-light to-aqua bg-clip-text text-transparent">
                {h.heroTitle2}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-coral sm:-bottom-3 sm:h-4"
              >
                <path
                  d="M2 10c30-8 60-8 90 0s60 8 90 0 60-8 90 0 20 4 26 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-foam/85 sm:text-xl">
            {h.heroTextBefore} {siteConfig.brands[0]} {h.heroTextAt}{" "}
            <strong className="text-white">{h.heroTextBelow(DISCOUNT_PERCENT)}</strong>
            {h.heroTextAfter}
          </p>

          <form
            action={href("/products")}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-soft"
          >
            <Search className="ml-3 size-5 shrink-0 text-muted" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">
              {h.searchLabel}
            </label>
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder={h.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink placeholder:text-muted/80 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-coral px-5 py-2.5 font-semibold text-white transition-colors hover:bg-coral-dark"
            >
              {h.searchButton}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={href("/products")}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-semibold transition-colors hover:bg-white/10"
            >
              {h.browseAll(products.length)} <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappLink(generalMessage(lang))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" /> {t.common.chatOnWhatsApp}
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { value: `${products.length}+`, label: h.stats.products },
              { value: `${DISCOUNT_PERCENT}%`, label: h.stats.discount },
              { value: h.stats.species, label: h.stats.speciesLabel },
              { value: h.stats.ordering, label: h.stats.orderingLabel },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col-reverse rounded-2xl bg-white/8 px-3 py-2.5 ring-1 ring-white/12 backdrop-blur"
              >
                <dt className="text-xs text-foam/70">{s.label}</dt>
                <dd className="font-display text-lg leading-tight font-bold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroPacks />
      </div>

      <Wave className="absolute bottom-0 left-0 h-14 w-full text-cream sm:h-20" />
    </section>
  );
}

const HERO_PACKS = [
  { slug: "bacitox-plus", className: "top-0 left-[8%] w-44", tilt: "-6deg", delay: "0s" },
  { slug: "zeomin", className: "top-6 right-0 w-48", tilt: "5deg", delay: "-2s" },
  { slug: "pathostat-blu", className: "top-[42%] left-0 w-40", tilt: "4deg", delay: "-4s" },
  { slug: "rhodobac", className: "right-[6%] bottom-0 w-52", tilt: "-4deg", delay: "-1s" },
];

function HeroPacks() {
  return (
    <div aria-hidden className="relative hidden h-[440px] lg:block">
      <div className="absolute inset-[12%] rounded-full bg-aqua/20 blur-3xl" />
      {HERO_PACKS.map(({ slug, className, tilt, delay }) => {
        const product = getProduct(slug);
        if (!product) return null;
        return (
          <div
            key={slug}
            className={`absolute animate-float overflow-hidden rounded-drop bg-white p-1 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.5)] ring-4 ring-white/15 ${className}`}
            style={{ animationDelay: delay, ["--tilt" as string]: tilt }}
          >
            <ProductImage
              product={product}
              sizes="210px"
              priority
              className="rounded-[1.7rem_1.7rem_1.7rem_0.4rem]"
            />
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-lagoon">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}

function ProblemFinder({ lang, t, href }: SectionProps) {
  return (
    <section id="problems" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow={t.home.problemsEyebrow}
        title={t.home.problemsTitle}
        intro={t.home.problemsIntro}
      />
      <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {(Object.keys(problems) as ProblemSlug[]).map((slug) => {
          const text = problemText(slug, lang);
          return (
            <li key={slug} className="reveal">
              <Link
                href={href(`/products?problem=${slug}`)}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-deep/8 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-aqua/50 hover:shadow-glow sm:flex-row sm:gap-4 sm:p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-drop bg-foam text-lagoon transition-colors group-hover:bg-lagoon group-hover:text-white sm:size-12">
                  <ProblemIcon problem={slug} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base leading-tight font-semibold text-ink sm:text-lg">
                    {text.label}
                  </span>
                  <span className="mt-0.5 hidden text-sm text-muted sm:block">{text.hint}</span>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-lagoon">
                    {t.common.products(problemCounts[slug] ?? 0)}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Categories({ lang, t, href }: SectionProps) {
  return (
    <section className="relative bg-deep text-white">
      <Wave flip className="absolute top-0 left-0 h-12 w-full -translate-y-px text-cream sm:h-16" />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-aqua-light">{t.home.categoriesEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t.home.categoriesTitle}</h2>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.keys(categories) as CategorySlug[]).map((slug) => {
            const cover = getProduct(CATEGORY_COVERS[slug]);
            return (
              <li key={slug} className="reveal">
                <Link
                  href={href(`/products?category=${slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/6 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-aqua/60"
                >
                  {cover && <ProductImage product={cover} sizes="(min-width: 1024px) 200px, 45vw" />}
                  <span className="flex flex-1 flex-col p-3">
                    <span className="font-display leading-tight font-semibold">
                      {categoryText(slug, lang).label}
                    </span>
                    <span className="mt-1 text-sm text-aqua-light">
                      {t.common.products(categoryCounts[slug] ?? 0)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Wave className="absolute bottom-0 left-0 h-12 w-full translate-y-px text-cream sm:h-16" />
    </section>
  );
}

function Featured({ t, href }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow={t.home.featuredEyebrow} title={t.home.featuredTitle} />
        <Link
          href={href("/products")}
          className="inline-flex items-center gap-1.5 font-semibold text-lagoon hover:text-deep"
        >
          {t.common.viewAllProducts} <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {featured.map((p) => (
          <div key={p.slug} className="reveal flex">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Brands({ t }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="reveal grid gap-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-deep/6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-lagoon">{t.home.brandsEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{t.home.brandsTitle}</h2>
          <p className="mt-3 text-lg text-muted">{t.home.brandsText}</p>
        </div>
        <ul className="grid gap-3">
          {Object.values(brands).map((b) => (
            <li
              key={b.manufacturer}
              className="flex items-center gap-4 rounded-2xl bg-linear-to-r from-foam to-cream p-4 ring-1 ring-deep/8"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-drop bg-deep font-display text-xl font-extrabold text-white">
                {b.manufacturer.charAt(0)}
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-ink">{b.manufacturer}</span>
                <span className="text-sm text-muted">{b.range}</span>
              </span>
            </li>
          ))}
          <li className="rounded-2xl border-2 border-dashed border-deep/15 p-4 text-center text-sm font-medium text-muted">
            {t.home.brandsMore}
          </li>
        </ul>
      </div>
    </section>
  );
}

const REASON_ICONS = [BadgePercent, PackageCheck, Stethoscope, Truck];

function WhyUs({ t }: SectionProps) {
  return (
    <section className="bg-scales">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle(siteConfig.name)} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.reasons.map((reason, i) => {
            const Icon = REASON_ICONS[i];
            return (
              <li key={reason.text} className="reveal rounded-drop bg-white p-6 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-aqua to-lagoon text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{reason.title(DISCOUNT_PERCENT)}</h3>
                <p className="mt-1.5 text-muted">{reason.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HowToOrder({ lang, t }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-underwater px-6 py-12 text-white sm:px-12">
        <div aria-hidden className="absolute inset-0 caustics" />
        <Bubbles />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow text-aqua-light">{t.home.howEyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t.home.howTitle}</h2>
            <p className="mt-3 text-lg text-foam/80">{t.home.howText}</p>
            <a
              href={whatsappLink(generalMessage(lang))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-5" /> {t.home.startChat}
            </a>
          </div>
          <ol className="grid gap-3">
            {t.home.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10 backdrop-blur"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-coral font-display text-lg font-bold">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold">{step.title}</span>
                  <span className="text-foam/80">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
