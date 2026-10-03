import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Fish, Info } from "lucide-react";
import { waterParameters, waterTips } from "@/data/water-quality";
import { problemText } from "@/data/taxonomy";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { PageBanner } from "@/components/page-banner";
import { ProblemIcon } from "@/components/problem-icon";

export async function generateMetadata({ params }: PageProps<"/[lang]/water-quality">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/water-quality", {
    title: t.meta.waterTitle,
    description: t.meta.waterDescription,
  });
}

export default async function WaterQualityPage({ params }: PageProps<"/[lang]/water-quality">) {
  const { lang, t, href } = await getLocale(params);
  const w = t.water;
  const hi = lang === "hi";

  return (
    <main className="flex-1">
      <PageBanner eyebrow={w.eyebrow} title={w.title}>
        {w.intro}
      </PageBanner>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="relative -mt-10 overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-deep/6">
          {/* Desktop / tablet table */}
          <table className="hidden w-full text-left md:table">
            <caption className="sr-only">{w.caption}</caption>
            <thead className="bg-deep text-white">
              <tr>
                {[w.parameter, w.shrimp, w.fish, w.notes].map((h) => (
                  <th key={h} scope="col" className="px-5 py-4 font-display text-lg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-deep/8">
              {waterParameters.map((p) => (
                <tr key={p.name} className="odd:bg-cream/60">
                  <th scope="row" className="px-5 py-3.5 font-semibold text-ink">
                    {hi ? p.nameHi : p.name}
                    {p.unit && <span className="ml-1 font-normal text-muted">({p.unit})</span>}
                  </th>
                  <td className="px-5 py-3.5 font-display text-lg font-semibold text-deep">{p.shrimp}</td>
                  <td className="px-5 py-3.5 font-display text-lg font-semibold text-deep">
                    {p.fish}
                    {p.fishVaries && <sup className="text-coral-dark">*</sup>}
                  </td>
                  <td className="px-5 py-3.5 text-muted">
                    {hi ? p.remarkHi : p.remark}
                    {p.problem && (
                      <Link
                        href={href(`/products?problem=${p.problem}`)}
                        className="mt-0.5 flex w-fit items-center gap-1 text-sm font-semibold text-lagoon hover:text-deep"
                      >
                        {w.productsFor(problemText(p.problem, lang).label)}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phone cards */}
          <ul className="divide-y divide-deep/8 md:hidden">
            {waterParameters.map((p) => (
              <li key={p.name} className="p-4">
                <p className="font-display text-lg font-semibold text-ink">
                  {hi ? p.nameHi : p.name}
                  {p.unit && <span className="ml-1 text-sm font-normal text-muted">({p.unit})</span>}
                </p>
                <dl className="mt-2 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-foam px-3 py-2">
                    <dt className="text-xs font-semibold tracking-wide text-lagoon uppercase">{w.shrimp}</dt>
                    <dd className="font-display text-lg font-bold text-deep">{p.shrimp}</dd>
                  </div>
                  <div className="rounded-xl bg-sand/70 px-3 py-2">
                    <dt className="text-xs font-semibold tracking-wide text-ink/60 uppercase">{w.fish}</dt>
                    <dd className="font-display text-lg font-bold text-deep">
                      {p.fish}
                      {p.fishVaries && <sup className="text-coral-dark">*</sup>}
                    </dd>
                  </div>
                </dl>
                {p.remark && <p className="mt-2 text-sm text-muted">{hi ? p.remarkHi : p.remark}</p>}
                {p.problem && (
                  <Link
                    href={href(`/products?problem=${p.problem}`)}
                    className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-lagoon"
                  >
                    {t.common.productsThatHelp} <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 flex gap-2 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="text-coral-dark">*</span> {w.footnote}
          </span>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold text-ink">{w.tipsTitle}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {waterTips.map((tip) => (
            <li key={tip.title} className="flex gap-4 rounded-drop bg-white p-5 shadow-soft">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-aqua to-lagoon text-white">
                <ProblemIcon problem={tip.problem} className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink">{hi ? tip.titleHi : tip.title}</h3>
                <p className="mt-1 text-muted">{hi ? tip.textHi : tip.text}</p>
                <Link
                  href={href(`/products?problem=${tip.problem}`)}
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-lagoon hover:text-deep"
                >
                  {t.common.seeProducts} <ArrowRight className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[1.75rem] bg-deep p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <Fish className="size-10 shrink-0 text-aqua-light" aria-hidden />
            <div>
              <p className="font-display text-2xl font-bold">{w.ctaTitle}</p>
              <p className="text-foam/80">{w.ctaText}</p>
            </div>
          </div>
          <Link
            href={`${href("/")}#problems`}
            className="shrink-0 rounded-full bg-coral px-6 py-3 font-semibold transition-colors hover:bg-coral-dark"
          >
            {w.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
