import Fuse from "fuse.js";
import { products, type Product } from "@/data/products";
import { taglinesHi } from "@/data/products-hi";
import {
  applications,
  categories,
  problems,
  species,
  type ApplicationSlug,
  type CategorySlug,
  type ProblemSlug,
  type SpeciesSlug,
} from "@/data/taxonomy";

export type Filters = {
  q: string;
  problem?: ProblemSlug;
  category?: CategorySlug;
  species?: SpeciesSlug;
  use?: ApplicationSlug;
};

const isKey = <T extends object>(obj: T, key: string | null): key is Extract<keyof T, string> =>
  !!key && Object.hasOwn(obj, key);

/** Reads filters from URL search params, ignoring unknown values. */
export function parseFilters(params: URLSearchParams): Filters {
  const problem = params.get("problem");
  const category = params.get("category");
  const sp = params.get("species");
  const use = params.get("use");
  return {
    q: params.get("q")?.trim() ?? "",
    problem: isKey(problems, problem) ? problem : undefined,
    category: isKey(categories, category) ? category : undefined,
    species: isKey(species, sp) ? sp : undefined,
    use: isKey(applications, use) ? use : undefined,
  };
}

export function filtersToQuery(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.problem) params.set("problem", filters.problem);
  if (filters.category) params.set("category", filters.category);
  if (filters.species) params.set("species", filters.species);
  if (filters.use) params.set("use", filters.use);
  return params.toString();
}

// Index product text plus the human labels of its problems/category,
// so "white feces" or "oxygen" finds the right products.
const documents = products.map((p) => ({
  product: p,
  name: p.name,
  nameHi: p.nameHi,
  tagline: `${p.tagline} ${taglinesHi[p.slug] ?? ""}`,
  keywords: p.keywords.join(" "),
  problems: p.problems
    .map((s) => `${problems[s].label} ${problems[s].hint} ${problems[s].hi.label} ${problems[s].hi.hint}`)
    .join(" "),
  category: `${categories[p.category].label} ${categories[p.category].hi.label}`,
  description: p.description,
  composition: p.composition,
}));

const fuse = new Fuse(documents, {
  keys: [
    { name: "name", weight: 4 },
    { name: "nameHi", weight: 3 },
    { name: "keywords", weight: 2.5 },
    { name: "problems", weight: 2 },
    { name: "tagline", weight: 1.5 },
    { name: "category", weight: 1.5 },
    { name: "description", weight: 1 },
    { name: "composition", weight: 0.7 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function searchProducts(filters: Filters): Product[] {
  const base = filters.q ? fuse.search(filters.q).map((r) => r.item.product) : products;
  return base.filter(
    (p) =>
      (!filters.problem || p.problems.includes(filters.problem)) &&
      (!filters.category || p.category === filters.category) &&
      (!filters.species || p.species.includes(filters.species)) &&
      (!filters.use || p.applications.includes(filters.use)),
  );
}
