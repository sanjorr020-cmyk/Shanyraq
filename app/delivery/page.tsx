import type { Metadata } from "next";
import { IconTruck, IconWhatsApp } from "@/components/Icons";
import { siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description: "Доставка и способы оплаты в строительном магазине Shanyraq, Караоткель: карта, наличные, перевод, QR-код.",
};

export default function DeliveryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Доставка и оплата</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line p-6">
          <IconTruck width={32} height={32} className="text-accent" />
          <h2 className="mt-4 text-2xl font-semibold">Доставка</h2>
          <p className="mt-3 text-muted">{siteData.delivery}</p>
          <p className="mt-3 text-muted">
            Стоимость и сроки зависят от адреса и объёма. Точные условия подскажем в WhatsApp.
          </p>
          <a
            href={waLink("Здравствуйте! Подскажите условия доставки.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
          >
            <IconWhatsApp />
            Уточнить условия
          </a>
        </div>

        <div className="rounded-2xl border border-line p-6">
          <h2 className="text-2xl font-semibold">Оплата</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {siteData.payments.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Оплата в магазине. Онлайн-оплата на сайте не принимается.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-surface p-6 text-muted">
        Ориентир: {siteData.landmark}. Адрес магазина: {siteData.address.full}. Часы работы: {siteData.hours.text}.
      </div>
    </section>
  );
}
