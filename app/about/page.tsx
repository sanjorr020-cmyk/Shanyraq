import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "О магазине",
  description: "О строительном магазине Shanyraq в Караоткеле: что продаём, часы работы, рейтинг в 2ГИС.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">О магазине</h1>
      <div className="mt-8 overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "3/2" }}>
        {/* Фото: Pexels, см. README (раздел «Фото») */}
        <img
          src="/photos/about-plan-tools.jpg"
          alt="Чертёж этажа, рулетка, дрель и саморезы на деревянном полу"
          width={800}
          height={533}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
        <p>
          Shanyraq — строительный магазин в {siteData.address.locality}, {siteData.address.region}. Продаём сантехнику,
          сухие строительные смеси, электроинструмент, крепёж, герметики и монтажную пену, краски и инструмент.
        </p>
        <p>
          Работаем ежедневно с {siteData.hours.opens} до {siteData.hours.closes}. Наличие и цену уточняем в WhatsApp: так
          точнее, чем по сайту, потому что остатки меняются.
        </p>
        <p>
          Рейтинг магазина в {siteData.rating.source}: {siteData.rating.value} по {siteData.rating.count} оценкам.
        </p>
      </div>
      <p className="mt-10">
        <Link href="/contacts" className="font-semibold text-accent hover:underline">
          Адрес и контакты
        </Link>
      </p>
    </section>
  );
}
