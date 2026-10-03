import en, { type Dictionary } from "./en";
import hi from "./hi";
import type { Locale } from "./config";

export type { Dictionary };
export * from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

/** Dictionaries are small, so both are bundled; works in server and client components. */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
