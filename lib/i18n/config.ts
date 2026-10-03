export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/**
 * English lives at the root ("/products"), Hindi under "/hi" ("/hi/products").
 * proxy.ts rewrites un-prefixed URLs to the internal /en route.
 */
export function localePath(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** "/hi/products" -> "/products"; "/products" -> "/products". */
export function stripLocale(pathname: string) {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export const htmlLang: Record<Locale, string> = { en: "en-IN", hi: "hi-IN" };
