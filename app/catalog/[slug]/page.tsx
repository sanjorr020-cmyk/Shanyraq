import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog";
import { IconArrow } from "@/components/Icons";
import { categories, getCategory, siteData } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Категория не найдена" };
  return {
    title: `${cat.title} в Караоткеле`,
    description: `${cat.title} в строительном магазине Shanyraq, ${siteData.address.locality}. ${cat.description} Наличие и цену уточняйте в WhatsApp.`,
    alternates: { canonical: `/catalog/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted">
          <Link href="/catalog" className="hover:text-brand">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{cat.title}</span>
        </nav>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{cat.title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6" aria-labelledby="items-title">
        <h2 id="items-title" className="sr-only">
          Товары: {cat.title}
        </h2>
        <Catalog lockedCategory={cat.slug} />

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">Не нашли нужную позицию? Напишите в WhatsApp — подскажем наличие и аналог.</p>
          <Link href="/search" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
            Искать по всем товарам
            <IconArrow width={16} height={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
