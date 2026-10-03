import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, HeartHandshake, PackageCheck, Stethoscope } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/taxonomy";
import { DISCOUNT_PERCENT, siteConfig } from "@/lib/site-config";
import { GENERAL_ENQUIRY_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { PageBanner } from "@/components/page-banner";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.name} supplies aquaculture health products to fish and shrimp farmers at wholesale prices.`,
};

// TODO(owner): replace with the business's own story, founding year and photos.
const VALUES = [
  {
    icon: PackageCheck,
    title: "Genuine stock",
    text: `Products sourced from ${siteConfig.brands[0]}, sold in sealed, original packs.`,
  },
  {
    icon: BadgePercent,
    title: "Fair wholesale prices",
    text: `Every product ${DISCOUNT_PERCENT}% below MRP, with the MRP shown so you can compare.`,
  },
  {
    icon: Stethoscope,
    title: "Practical advice",
    text: "Tell us what's happening in your pond and we'll help you pick the right product and dose.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term relationships",
    text: "We work with farmers, hatcheries and dealers season after season.",
  },
];

export default function AboutPage() {
  const stats = [
    { value: `${products.length}+`, label: "Aquaculture products" },
    { value: `${Object.keys(categories).length}`, label: "Product categories" },
    { value: `${DISCOUNT_PERCENT}%`, label: "Below MRP" },
    { value: "Fish & shrimp", label: "Ponds and hatcheries" },
  ];

  return (
    <main className="flex-1">
      <PageBanner eyebrow="About us" title={`${siteConfig.name}: your partner for healthy ponds`}>
        {siteConfig.description}
      </PageBanner>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="relative -mt-10 grid grid-cols-2 gap-3 rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-deep/6 sm:p-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream p-4 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-deep">{s.value}</span>
                <span className="text-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Who we are</h2>
          <div className="mt-4 space-y-4 text-lg text-ink/80">
            <p>
              {siteConfig.name} is a wholesale supplier of aquaculture health products. We stock the{" "}
              {siteConfig.brands.join(" and ")} range of probiotics, zeolites, oxygen supplements,
              disinfectants, minerals and feed additives used by fish and shrimp farmers.
            </p>
            <p>
              We keep ordering simple: find what you need on this website, see the price upfront, and send us
              your order on WhatsApp. We confirm availability and arrange delivery on the same chat.
            </p>
          </div>
          <a
            href={whatsappLink(GENERAL_ENQUIRY_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-abyss transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-5" /> Talk to us on WhatsApp
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-drop bg-white p-5 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-linear-to-br from-aqua to-lagoon text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-1 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-[1.75rem] bg-underwater p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl font-bold">Ready to order?</p>
            <p className="text-foam/80">Browse the full catalogue with prices.</p>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-coral px-6 py-3 font-semibold transition-colors hover:bg-coral-dark"
          >
            View products
          </Link>
        </div>
      </section>
    </main>
  );
}
