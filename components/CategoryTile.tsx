import Link from "next/link";
import type { Category } from "@/lib/content";

export default function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="zoom aspect-[4/3] overflow-hidden bg-surface">
        {/* Обложка AI: заменить на реальное фото магазина */}
        <img
          src={category.cover}
          alt={category.title}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[17px] font-semibold leading-snug">{category.title}</h3>
        <p className="mt-1 text-sm text-muted">{category.description}</p>
        {/* Цены «от» — заглушка, пока владелец не даст цены */}
        <p className="mt-3 text-sm font-semibold">от … ₸ <span className="font-normal text-muted">· уточнить у владельца</span></p>
      </div>
    </Link>
  );
}
