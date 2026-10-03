import type { Metadata } from "next";
import { localePath, locales, type Locale } from "./i18n";
import { siteConfig } from "./site-config";

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

const ogLocale: Record<Locale, string> = { en: "en_IN", hi: "hi_IN" };

/**
 * Canonical URL, hreflang alternates and Open Graph basics for a page.
 * `path` is the un-prefixed route, e.g. "/products/zeomin".
 */
export function pageMetadata(
  lang: Locale,
  path: string,
  meta: { title?: string; description: string },
): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l, path)]));
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { ...languages, "x-default": path },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: ogLocale[lang],
      url: localePath(lang, path),
      title: meta.title,
      description: meta.description,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" to prevent injection). */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
