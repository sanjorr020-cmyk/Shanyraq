import type { Metadata } from "next";
import { IconClock, IconPhone, IconPin, IconRoute, IconWhatsApp } from "@/components/Icons";
import { siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Адрес, часы работы, телефон и WhatsApp строительного магазина Shanyraq в Караоткеле.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Контакты</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-line p-6 md:p-8">
          <div className="flex gap-3">
            <IconPin className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-semibold">Адрес</p>
              <p className="mt-1 text-muted">{siteData.address.full}</p>
              <p className="mt-1 text-muted">{siteData.landmark}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <IconClock className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-semibold">Часы работы</p>
              <p className="mt-1 text-muted">{siteData.hours.text}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <IconPhone className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-semibold">Телефон и WhatsApp</p>
              <a href={`tel:${siteData.phone.tel}`} className="mt-1 block text-lg font-semibold hover:text-brand">
                {siteData.phone.display}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(generalQuestion)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
            >
              <IconWhatsApp />
              Написать в WhatsApp
            </a>
            <a
              href={siteData.rating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-ink"
            >
              <IconRoute />
              Маршрут в 2ГИС
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line p-6 md:p-8">
          <p className="text-sm text-muted">Рейтинг в {siteData.rating.source}</p>
          <p className="mt-2 text-4xl font-bold tabular-nums">
            {siteData.rating.value}
            <span className="ml-2 text-lg font-medium text-muted">· {siteData.rating.count} оценок</span>
          </p>
          <p className="mt-6 text-muted">
            Карта и отзывы — в карточке магазина в {siteData.rating.source}. Ссылку на карточку уточним перед запуском.
          </p>
        </div>
      </div>
    </section>
  );
}
