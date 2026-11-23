"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/content";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allProducts.filter((p) => `${p.name} ${p.categoryTitle}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Поиск по товарам
      </label>
      <input
        id="search"
        type="search"
        autoFocus
        placeholder="Например: герметик, дрель, штукатурка"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base outline-none placeholder:text-muted focus:border-accent"
      />

      <div className="mt-8">
        {query.trim().length < 2 ? (
          <p className="text-muted">Введите название товара или категории — от двух букв.</p>
        ) : results.length === 0 ? (
          <p className="text-muted">
            Ничего не нашли по запросу «{query}». Напишите нам в WhatsApp — поищем или подскажем аналог.
          </p>
        ) : (
          <>
            <p className="mb-4 text-muted">Найдено: {results.length}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} id={p.id} name={p.name} categoryTitle={p.categoryTitle} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
