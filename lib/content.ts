import site from "@/content/site.json";
import categoriesData from "@/content/categories.json";
import calculatorData from "@/content/calculator.json";

export const siteData = site;

export type CategoryItem = { name: string; _note?: string };

export type Category = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  coverNote?: string;
  items: CategoryItem[];
};

export const categories: Category[] = categoriesData.categories;

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export type Product = { id: string; name: string; category: string; categoryTitle: string };

export const allProducts: Product[] = categories.flatMap((c) =>
  c.items.map((item) => ({
    id: `${c.slug}:${item.name}`,
    name: item.name,
    category: c.slug,
    categoryTitle: c.title,
  })),
);

export type Material = {
  id: string;
  name: string;
  mode: "thickness" | "coats";
  defaultThickness: number;
  unit: string;
  ratePerM2PerUnit: number;
  packSize: number;
  packLabel: string;
};

export const calculator = {
  wastePercent: calculatorData.wastePercent,
  materials: calculatorData.materials as Material[],
  sourcesToOpen: calculatorData.sourcesToOpen,
};
