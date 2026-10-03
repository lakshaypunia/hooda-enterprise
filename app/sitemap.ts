import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const STATIC_PATHS = ["/", "/products", "/water-quality", "/about", "/contact"];

/** English URLs with their Hindi alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...products.map((p) => `/products/${p.slug}`)];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path.startsWith("/products/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
    },
  }));
}
