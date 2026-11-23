import type { Metadata } from "next";
import BuildersForm from "@/components/BuildersForm";
import { IconTruck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Для строителей и бригад",
  description: "Оптовый расчёт для строителей и бригад в магазине Shanyraq, Караоткель. Заявка через WhatsApp.",
};

export default function BuildersPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:px-6">
      <div>
        <div className="mb-8 overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "4/3" }}>
          {/* Фото: Unsplash, см. README (раздел «Фото») */}
          <img
            src="/photos/builders-tools.jpg"
            alt="Электроинструмент на рабочем столе"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Для строителей и бригад</h1>
        <p className="mt-4 text-lg text-muted">
          Работаете на объектах? Оставьте заявку — подготовим оптовый расчёт и условия по объёму. Конкретные проценты
          скидок зависят от объёма и ассортимента, их называем в WhatsApp.
        </p>
        <ul className="mt-8 space-y-4 text-[15px]">
          <li className="flex gap-3">
            <IconTruck className="mt-0.5 shrink-0 text-accent" />
            <span>Доставка по Караоткелю, Косшы и Астане — условия уточняйте в WhatsApp.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>Оптовые условия и скидки — по объёму, в WhatsApp.</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-line p-6 md:p-8">
        <BuildersForm />
      </div>
    </section>
  );
}
