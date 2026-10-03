"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import {
  applicationLabel,
  applications,
  categories,
  categoryText,
  problems,
  problemText,
  species,
  speciesLabel,
  type ApplicationSlug,
  type CategorySlug,
  type ProblemSlug,
  type SpeciesSlug,
} from "@/data/taxonomy";
import { filtersToQuery, parseFilters, searchProducts, type Filters } from "@/lib/search";
import { whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "./i18n-provider";
import { WhatsAppIcon } from "./icons";
import { ProblemIcon } from "./problem-icon";
import { ProductCard } from "./product-card";

export function Catalogue() {
  const { lang, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const results = useMemo(() => searchProducts(filters), [filters]);

  const [query, setQuery] = useState(filters.q);
  const [syncedQ, setSyncedQ] = useState(filters.q);
  // Keep the input in sync when the URL changes from outside (back button, links).
  if (filters.q !== syncedQ) {
    setSyncedQ(filters.q);
    if (filters.q !== query.trim()) setQuery(filters.q);
  }
  const debounce = useRef<ReturnType<typeof setTimeout>>(undefined);

  const update = (next: Partial<Filters>) => {
    const qs = filtersToQuery({ ...filters, ...next });
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => update({ q: value.trim() }), 250);
  };

  useEffect(() => () => clearTimeout(debounce.current), []);

  const clearAll = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const activeCount = [filters.q, filters.problem, filters.category, filters.species, filters.use].filter(
    Boolean,
  ).length;
  const c = t.catalogue;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      {/* Search + filters panel overlaps the banner wave */}
      <div className="relative -mt-10 rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-deep/6 sm:p-6">
        <div className="flex items-center gap-2 rounded-full bg-cream px-4 ring-1 ring-deep/10 focus-within:ring-2 focus-within:ring-aqua">
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <label htmlFor="catalogue-search" className="sr-only">
            {c.searchLabel}
          </label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={c.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-muted/80 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label={c.clearSearch}
              className="grid size-8 place-items-center rounded-full text-muted hover:bg-deep/5"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <fieldset className="mt-5">
          <legend className="font-display text-sm font-semibold text-ink">{c.problem}</legend>
          <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {(Object.keys(problems) as ProblemSlug[]).map((slug) => {
              const active = filters.problem === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ problem: active ? undefined : slug })}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-lagoon bg-lagoon text-white"
                      : "border-deep/12 bg-white text-ink hover:border-aqua hover:bg-foam"
                  }`}
                >
                  <ProblemIcon problem={slug} className="size-4" />
                  {problemText(slug, lang).label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 md:grid-cols-[auto_1fr_1fr]">
          <Segmented
            label={c.for}
            allLabel={c.all}
            value={filters.species}
            options={(Object.keys(species) as SpeciesSlug[]).map((value) => ({
              value,
              label: speciesLabel(value, lang),
            }))}
            onChange={(v) => update({ species: v })}
          />
          <Select
            label={c.category}
            allLabel={c.all}
            value={filters.category}
            options={(Object.keys(categories) as CategorySlug[]).map((value) => ({
              value,
              label: categoryText(value, lang).label,
            }))}
            onChange={(v) => update({ category: v })}
          />
          <Select
            label={c.use}
            allLabel={c.all}
            value={filters.use}
            options={(Object.keys(applications) as ApplicationSlug[]).map((value) => ({
              value,
              label: applicationLabel(value, lang),
            }))}
            onChange={(v) => update({ use: v })}
          />
        </div>
      </div>

      {filters.problem && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-foam p-4 text-deep">
          <ProblemIcon problem={filters.problem} className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong className="font-semibold">{problemText(filters.problem, lang).label}:</strong>{" "}
            {problemText(filters.problem, lang).hint}. {c.problemNote}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted" aria-live="polite">
          <SlidersHorizontal className="mr-1.5 inline size-4 align-[-2px]" aria-hidden />
          {c.showing} <strong className="text-ink">{t.common.products(results.length)}</strong>
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-semibold text-lagoon hover:text-deep"
          >
            {c.clearAll}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <EmptyState query={filters.q} onClear={clearAll} />
      )}
    </div>
  );
}

type Option<T extends string> = { value: T; label: string };

type ControlProps<T extends string> = {
  label: string;
  allLabel: string;
  value?: T;
  options: Option<T>[];
  onChange: (value: T | undefined) => void;
};

function Select<T extends string>({ label, allLabel, value, options, onChange }: ControlProps<T>) {
  return (
    <label className="block">
      <span className="font-display text-sm font-semibold text-ink">{label}</span>
      <span className="relative mt-2 block">
        <select
          value={value ?? ""}
          onChange={(e) => onChange((e.target.value || undefined) as T | undefined)}
          className="w-full appearance-none rounded-xl border border-deep/12 bg-white px-3 py-2.5 pr-9 text-ink focus:border-aqua focus:outline-none"
        >
          <option value="">{allLabel}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );
}

function Segmented<T extends string>({ label, allLabel, value, options, onChange }: ControlProps<T>) {
  const all: Option<T | "">[] = [{ value: "", label: allLabel }, ...options];
  return (
    <fieldset>
      <legend className="font-display text-sm font-semibold text-ink">{label}</legend>
      <div className="mt-2 flex rounded-xl bg-cream p-1 ring-1 ring-deep/10">
        {all.map((o) => {
          const active = (value ?? "") === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange((o.value || undefined) as T | undefined)}
              className={`flex-auto rounded-lg px-2.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                active ? "bg-deep text-white shadow-sm" : "text-ink hover:bg-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  const { t } = useI18n();
  const message = query ? t.wa.lookingFor(query) : t.wa.needHelp;
  return (
    <div className="mt-6 rounded-[1.75rem] border border-dashed border-deep/20 bg-white px-6 py-12 text-center">
      <p className="font-display text-2xl font-bold text-ink">{t.catalogue.emptyTitle}</p>
      <p className="mx-auto mt-2 max-w-md text-muted">{t.catalogue.emptyText}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-deep/15 px-5 py-2.5 font-semibold text-ink hover:bg-foam"
        >
          {t.catalogue.clearFilters}
        </button>
        <a
          href={whatsappLink(message, "query")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-abyss"
        >
          <WhatsAppIcon className="size-5" /> {t.catalogue.askOnWhatsApp}
        </a>
      </div>
    </div>
  );
}
