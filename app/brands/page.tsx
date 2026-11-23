import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Бренды",
  description: "Бренды, которые продаёт строительный магазин Shanyraq в Караоткеле. Наличие уточняйте в WhatsApp.",
};

export default function BrandsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Бренды</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Бренды в магазине. Наличие конкретной позиции и цену уточняйте в WhatsApp.
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {siteData.brands.map((b) => (
          <li key={b} className="rounded-2xl border border-line p-6 text-lg font-semibold">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">Нет нужного бренда в списке? Спросите — проверим и подскажем.</p>
        <a
          href={waLink(generalQuestion)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          Спросить в WhatsApp
        </a>
      </div>
      <p className="mt-6 text-sm text-muted">
        <Link href="/catalog" className="underline underline-offset-4">
          Перейти в каталог
        </Link>
      </p>
    </section>
  );
}
