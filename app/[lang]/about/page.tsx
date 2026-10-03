import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, HeartHandshake, PackageCheck, Stethoscope } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/taxonomy";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { DISCOUNT_PERCENT, serviceAreaText, siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { PageBanner } from "@/components/page-banner";

// TODO(owner): replace with the business's own story, founding year and photos.
const VALUE_ICONS = [PackageCheck, BadgePercent, Stethoscope, HeartHandshake];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/about", { title: t.meta.aboutTitle, description: t.meta.aboutDescription });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang, t, href } = await getLocale(params);
  const a = t.about;
  const stats = [
    { value: `${products.length}+`, label: a.stats.products },
    { value: `${Object.keys(categories).length}`, label: a.stats.categories },
    { value: `${DISCOUNT_PERCENT}%`, label: a.stats.discount },
    { value: a.stats.species, label: a.stats.speciesLabel },
  ];

  return (
    <main className="flex-1">
      <PageBanner eyebrow={a.eyebrow} title={a.title(siteConfig.name)}>
        {t.meta.aboutDescription}
      </PageBanner>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="relative -mt-10 grid grid-cols-2 gap-3 rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-deep/6 sm:p-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-cream p-4 text-center">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-extrabold text-deep">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{a.whoTitle}</h2>
          <div className="mt-4 space-y-4 text-lg text-ink/80">
            <p>{a.who1(siteConfig.name, siteConfig.brands.join(", "))}</p>
            <p>{a.who2}</p>
            {serviceAreaText(lang) && (
              <p className="font-semibold text-deep">{t.area.about(serviceAreaText(lang))}</p>
            )}
          </div>
          <a
            href={whatsappLink(generalMessage(lang))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-abyss transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-5" /> {a.talk}
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {a.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <li key={v.title} className="rounded-drop bg-white p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-full bg-linear-to-br from-aqua to-lagoon text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-xl font-bold text-ink">{v.title}</h3>
                <p className="mt-1 text-muted">
                  {typeof v.text === "function" ? v.text(DISCOUNT_PERCENT) : v.text}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="dealer" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-10 sm:px-6">
        <div className="rounded-[1.75rem] border-2 border-dashed border-lagoon/30 bg-foam/60 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{a.dealerTitle}</h2>
          <p className="mt-3 max-w-3xl text-lg text-ink/80">{t.dealer.note}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {a.dealerPoints.map(([title, text]) => (
              <li key={title} className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="font-display text-lg font-semibold text-deep">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-[1.75rem] bg-underwater p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl font-bold">{a.ctaTitle}</p>
            <p className="text-foam/80">{a.ctaText}</p>
          </div>
          <Link
            href={href("/products")}
            className="rounded-full bg-coral px-6 py-3 font-semibold transition-colors hover:bg-coral-dark"
          >
            {a.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
