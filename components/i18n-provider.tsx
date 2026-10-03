"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getDictionary, localePath, type Dictionary, type Locale } from "@/lib/i18n";

type I18n = { lang: Locale; t: Dictionary; href: (path: string) => string };

const I18nContext = createContext<I18n | null>(null);

/** Gives client components the current locale, its dictionary and a locale-aware href helper. */
export function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const value = useMemo(
    () => ({ lang, t: getDictionary(lang), href: (path: string) => localePath(lang, path) }),
    [lang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
