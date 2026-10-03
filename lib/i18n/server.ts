import { notFound } from "next/navigation";
import { getDictionary, hasLocale, localePath, type Locale } from ".";

/** Resolves the [lang] route param for server components; unknown locales 404. */
export async function getLocale(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang: lang as Locale, t: getDictionary(lang), href: (path: string) => localePath(lang, path) };
}
