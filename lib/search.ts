import Fuse from "fuse.js";
import searchData from "@/content/search.json";
import { allProducts, categories, type Product } from "@/lib/content";

export type SearchProduct = Product & {
  brand: string | null;
  brandText: string;
  purposes: string[];
  index: number;
};

export type Suggestion =
  | { kind: "product"; label: string; sub: string; id: string }
  | { kind: "category"; label: string; sub: string; slug: string }
  | { kind: "brand"; label: string; sub: string; brand: string };

/** Нижний регистр, ё → е, дефисы и знаки → пробелы. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[-_/.,;:()«»"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const synonyms: Record<string, string[]> = searchData.synonyms;
const brandAliases: Record<string, string[]> = searchData.brandAliases;
const purposeDefs = searchData.purposes;

/** Продукты с назначением. Бренд пока не привязан (владелец отметит позже). */
export const products: SearchProduct[] = allProducts.map((p, i) => {
  const purposes = purposeDefs.filter((d) => d.categories.includes(p.category)).map((d) => d.id);
  return { ...p, brand: null, brandText: "", purposes, index: i };
});

/** Бренды, которые реально привязаны к товарам. Пока пусто — владелец отметит позже. */
const knownBrands = new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)));

const fuse = new Fuse(products, {
  keys: [
    { name: "name", weight: 0.6 },
    { name: "categoryTitle", weight: 0.25 },
    { name: "brandText", weight: 0.15 },
  ],
  threshold: 0.36,
  ignoreLocation: true,
  includeScore: true,
});

/** Расширяет запрос: синонимы и перевод брендов. Возвращает набор поисковых строк. */
export function expandQuery(raw: string): { terms: string[]; brand: string | null } {
  const q = normalize(raw);
  if (!q) return { terms: [], brand: null };
  const terms = new Set<string>([q]);

  let brand: string | null = null;
  for (const [canon, aliases] of Object.entries(brandAliases)) {
    if (aliases.some((a) => normalize(a) === q)) {
      if (knownBrands.has(canon)) brand = canon;
      terms.add(normalize(canon));
    }
  }

  for (const [key, list] of Object.entries(synonyms)) {
    const k = normalize(key);
    if (q === k || q.includes(k)) {
      list.forEach((s) => terms.add(normalize(s)));
    }
  }
  return { terms: [...terms], brand };
}

/** Поиск товаров. Пустой запрос — пустой результат. */
export function searchProducts(raw: string): SearchProduct[] {
  const { terms, brand } = expandQuery(raw);
  if (terms.length === 0) return [];
  const seen = new Map<number, number>();
  for (const t of terms) {
    for (const r of fuse.search(t)) {
      const prev = seen.get(r.item.index);
      const score = r.score ?? 1;
      if (prev === undefined || score < prev) seen.set(r.item.index, score);
    }
  }
  let list = [...seen.entries()].sort((a, b) => a[1] - b[1]).map(([i]) => products[i]);
  if (brand) list = list.filter((p) => p.brand === brand);
  return list;
}

/** Подсказки при вводе (от 2 букв): товары, категории, бренды. */
export function suggest(raw: string): Suggestion[] {
  const q = normalize(raw);
  if (q.length < 2) return [];
  const out: Suggestion[] = [];

  for (const c of categories) {
    if (normalize(c.title).includes(q) || q.split(" ").some((w) => normalize(c.title).includes(w) && w.length > 2)) {
      out.push({ kind: "category", label: c.title, sub: "Категория", slug: c.slug });
    }
  }
  for (const [canon, aliases] of Object.entries(brandAliases)) {
    if (knownBrands.has(canon) && [canon, ...aliases].some((a) => normalize(a).startsWith(q))) {
      out.push({ kind: "brand", label: canon, sub: "Бренд", brand: canon });
    }
  }
  for (const p of searchProducts(raw).slice(0, 5)) {
    out.push({ kind: "product", label: p.name, sub: p.categoryTitle, id: p.id });
  }
  return out.slice(0, 8);
}

export const popularQueries: string[] = searchData.popularQueries;
export const purposes = purposeDefs.map((d) => ({ id: d.id, label: d.label }));
