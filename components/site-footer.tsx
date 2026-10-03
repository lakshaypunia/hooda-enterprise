"use client";

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { categories, categoryText, type CategorySlug } from "@/data/taxonomy";
import { siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "./i18n-provider";
import { LogoMark, Wave, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  const { lang, t, href } = useI18n();

  return (
    <footer className="relative mt-auto text-foam">
      <Wave className="-mb-px block h-12 w-full text-deep sm:h-16" />
      <div className="bg-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          <div>
            <Link href={href("/")} className="flex items-center gap-2 text-white">
              <LogoMark className="size-10" />
              <span className="font-display text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm rounded-2xl bg-white/6 p-3 text-sm text-foam/75 ring-1 ring-white/10">
              {t.dealer.note}
            </p>
          </div>

          <nav aria-label={t.footer.explore}>
            <h2 className="text-lg font-semibold text-white">{t.footer.explore}</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="text-foam/75 hover:text-aqua-light">
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.categories}>
            <h2 className="text-lg font-semibold text-white">{t.footer.categories}</h2>
            <ul className="mt-3 space-y-2">
              {(Object.keys(categories) as CategorySlug[]).slice(0, 6).map((slug) => (
                <li key={slug}>
                  <Link
                    href={href(`/products?category=${slug}`)}
                    className="text-foam/75 hover:text-aqua-light"
                  >
                    {categoryText(slug, lang).short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-semibold text-white">{t.footer.getInTouch}</h2>
            <ul className="mt-3 space-y-3 text-foam/80">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-aqua" aria-hidden />
                <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-aqua-light">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-aqua" aria-hidden />
                <span>{lang === "hi" ? siteConfig.addressHi : siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-aqua" aria-hidden />
                <span>{lang === "hi" ? siteConfig.hoursHi : siteConfig.hours}</span>
              </li>
            </ul>
            <a
              href={whatsappLink(generalMessage(lang))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" />
              {t.common.chatOnWhatsApp}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-foam/55 sm:flex-row sm:justify-between sm:px-6">
            <p>{t.footer.rights(new Date().getFullYear(), siteConfig.name)}</p>
            <p>{t.dealer.footerLine}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
