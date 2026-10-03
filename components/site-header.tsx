"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Languages, Menu, X } from "lucide-react";
import { localePath, stripLocale } from "@/lib/i18n";
import { SHOW_LANGUAGE_SWITCH, siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { BasketButton } from "./basket";
import { useI18n } from "./i18n-provider";
import { LogoMark, WhatsAppIcon } from "./icons";

export function SiteHeader() {
  const { lang, t, href } = useI18n();
  const pathname = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-deep/95 shadow-soft backdrop-blur-md" : "bg-deep"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={href("/")} className="flex min-w-0 items-center gap-2 text-white">
          <LogoMark className="size-9 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-bold">{siteConfig.name}</span>
            <span className="block truncate text-[11px] tracking-wide text-aqua-light uppercase">
              {t.brandTagline}
            </span>
          </span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={href(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-white/12 text-white"
                      : "text-foam/80 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {SHOW_LANGUAGE_SWITCH && <LanguageSwitch />}
          <a
            href={whatsappLink(generalMessage(lang))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-abyss transition-transform hover:scale-[1.03] md:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            {t.common.orderOnWhatsApp}
          </a>
          <BasketButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.nav.main}
        className={`overflow-hidden border-t border-white/10 transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="space-y-1 px-4 py-3">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={href(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-medium ${
                  isActive(item.href) ? "bg-white/12 text-white" : "text-foam/85"
                }`}
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/** Switches to the same page in the other language, keeping any search/filter query. */
function LanguageSwitch() {
  const { lang, t } = useI18n();
  const router = useRouter();
  const pathname = stripLocale(usePathname());
  const other = lang === "en" ? "hi" : "en";
  const target = localePath(other, pathname);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(target + window.location.search);
  };

  return (
    <Link
      href={target}
      onClick={onClick}
      hrefLang={other}
      aria-label={t.switchAria}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
    >
      <Languages className="size-4" aria-hidden />
      {t.switchLabel}
    </Link>
  );
}
