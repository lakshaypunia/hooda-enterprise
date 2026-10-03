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
import { getProduct, products, type Product } from "@/data/products";
import { categories, problems, type CategorySlug, type ProblemSlug } from "@/data/taxonomy";
import { plural } from "@/lib/format";
import { DISCOUNT_PERCENT, siteConfig } from "@/lib/site-config";
import { GENERAL_ENQUIRY_MESSAGE, whatsappLink } from "@/lib/whatsapp";
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

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemFinder />
      <Categories />
      <Featured />
      <WhyUs />
      <HowToOrder />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <Bubbles />
      <PondLife />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-28 sm:px-6 sm:pt-24 sm:pb-36 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-sm text-aqua-light backdrop-blur">
            <span className="size-2 rounded-full bg-whatsapp" />
            Wholesale aquaculture supplies · Fish & Shrimp
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-6xl">
            Healthy ponds,
            <br />
            <span className="bg-linear-to-r from-aqua-light to-aqua bg-clip-text text-transparent">
              better harvests.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-foam/85 sm:text-xl">
            Probiotics, zeolites, minerals, disinfectants and feed additives from {siteConfig.brands[0]} — at{" "}
            <strong className="text-white">{DISCOUNT_PERCENT}% below MRP</strong>, ordered straight on
            WhatsApp.
          </p>

          <form
            action="/products"
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-soft"
          >
            <Search className="ml-3 size-5 shrink-0 text-muted" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">
              Search products
            </label>
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Search a product or problem — e.g. ammonia, Zeomin"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink placeholder:text-muted/80 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-coral px-5 py-2.5 font-semibold text-white transition-colors hover:bg-coral-dark"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-semibold transition-colors hover:bg-white/10"
            >
              Browse all {products.length} products <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappLink(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
          </div>
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
      <p className="font-display text-sm font-semibold tracking-widest text-lagoon uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}

function ProblemFinder() {
  return (
    <section id="problems" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Find by problem"
        title="What's troubling your pond?"
        intro="Pick the problem you're facing and we'll show the products that help."
      />
      <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {(Object.keys(problems) as ProblemSlug[]).map((slug) => (
          <li key={slug}>
            <Link
              href={`/products?problem=${slug}`}
              className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-deep/8 bg-white p-3.5 sm:flex-row sm:gap-4 sm:p-4 transition-all hover:-translate-y-0.5 hover:border-aqua/50 hover:shadow-glow"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-drop bg-foam sm:size-12 text-lagoon transition-colors group-hover:bg-lagoon group-hover:text-white">
                <ProblemIcon problem={slug} className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-base leading-tight font-semibold text-ink sm:text-lg">
                  {problems[slug].label}
                </span>
                <span className="mt-0.5 hidden text-sm text-muted sm:block">{problems[slug].hint}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-lagoon">
                  {plural(problemCounts[slug] ?? 0, "product")}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Categories() {
  return (
    <section className="relative bg-deep text-white">
      <Wave flip className="absolute top-0 left-0 h-12 w-full -translate-y-px text-cream sm:h-16" />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold tracking-widest text-aqua-light uppercase">
            Shop by category
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Everything a pond needs</h2>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.keys(categories) as CategorySlug[]).map((slug) => {
            const cover = getProduct(CATEGORY_COVERS[slug]);
            return (
              <li key={slug}>
                <Link
                  href={`/products?category=${slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/6 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-aqua/60"
                >
                  {cover && (
                    <ProductImage
                      product={cover}
                      sizes="(min-width: 1024px) 200px, 45vw"
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="flex flex-1 flex-col p-3">
                    <span className="font-display leading-tight font-semibold">{categories[slug].label}</span>
                    <span className="mt-1 text-sm text-aqua-light">
                      {plural(categoryCounts[slug] ?? 0, "product")}
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

function Featured() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Farmer favourites" title="Popular products" />
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 font-semibold text-lagoon hover:text-deep"
        >
          View all products <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

const REASONS = [
  {
    icon: BadgePercent,
    title: `${DISCOUNT_PERCENT}% below MRP`,
    text: "Wholesale pricing on every pack, shown upfront next to the printed MRP.",
  },
  {
    icon: PackageCheck,
    title: "Genuine products",
    text: `Sourced directly from ${siteConfig.brands[0]}, with fresh stock and sealed packs.`,
  },
  {
    icon: Stethoscope,
    title: "Dosage guidance",
    text: "Not sure what your pond needs? Message us your problem and we'll suggest products and doses.",
  },
  {
    icon: Truck,
    title: "Bulk orders & delivery",
    text: "From a single pack to full shipper loads for farms, dealers and hatcheries.",
  },
];

function WhyUs() {
  return (
    <section className="bg-scales">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow="Why farmers choose us" title={`Why buy from ${siteConfig.name}`} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-drop bg-white p-6 shadow-soft">
              <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-aqua to-lagoon text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Find your product", text: "Search by name or by the problem in your pond." },
  { title: "Tap “Buy on WhatsApp”", text: "Your message is ready with the product, pack and quantity." },
  { title: "Confirm & receive", text: "We confirm price and delivery on chat. No forms, no sign-up." },
];

function HowToOrder() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-underwater px-6 py-12 text-white sm:px-12">
        <div aria-hidden className="absolute inset-0 caustics" />
        <Bubbles />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="font-display text-sm font-semibold tracking-widest text-aqua-light uppercase">
              How to order
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Order in three simple steps</h2>
            <p className="mt-3 text-lg text-foam/80">Ordering takes less than a minute on WhatsApp.</p>
            <a
              href={whatsappLink(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-5" /> Start a chat
            </a>
          </div>
          <ol className="grid gap-3">
            {STEPS.map((step, i) => (
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
