import type { Metadata } from "next";
import CategoryTile from "@/components/CategoryTile";
import { categories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Каталог строительного магазина Shanyraq в Караоткеле: сантехника, сухие смеси, электроинструмент, крепёж, герметики, краски, инструмент. Наличие и цену — в WhatsApp.",
};

export default function CatalogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Каталог</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Выберите категорию. Цены не публикуем: у каждого товара кнопка «Узнать цену и наличие» — ответим в WhatsApp.
      </p>
      <h2 className="sr-only">Категории товаров</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <CategoryTile key={c.slug} category={c} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
