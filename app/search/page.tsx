import type { Metadata } from "next";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Поиск по товарам",
  description: "Поиск по товарам строительного магазина Shanyraq в Караоткеле.",
};

export default function SearchPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Поиск по товарам</h1>
      <div className="mt-8">
        <SearchBox />
      </div>
    </section>
  );
}
