"use client";

import { useState, type FormEvent } from "react";
import { IconWhatsApp } from "@/components/Icons";
import { useList } from "@/components/ListContext";
import { waLink } from "@/lib/whatsapp";

/**
 * «Доставка и список»: адрес, что нужно, когда. Текст уходит в WhatsApp, который клиент отправляет сам.
 * Сайт ничего не сохраняет и на сервер не отправляет. Имя и телефон не спрашиваем: WhatsApp и так знает номер.
 */
export default function DeliveryForm() {
  const { items } = useList();
  const [address, setAddress] = useState("");
  const [what, setWhat] = useState("");
  const [when, setWhen] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!address.trim() || (!what.trim() && items.length === 0)) {
      setError("Укажите адрес и что нужно привезти (или добавьте товары в список).");
      return;
    }
    setError("");
    const listLines = items.map((i, n) => `${n + 1}. ${i.name} — ${i.qty} шт.`);
    const text = [
      "Здравствуйте! Хочу узнать условия доставки.",
      `Адрес / район: ${address.trim()}`,
      when.trim() ? `Когда нужно: ${when.trim()}` : "",
      what.trim() ? `Что нужно: ${what.trim()}` : "",
      listLines.length ? "Список из сайта:" : "",
      ...listLines,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-white p-6 md:p-8" noValidate>
      <div>
        <label htmlFor="d-address" className="mb-2 block font-semibold">
          Адрес или район
        </label>
        <input id="d-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Караоткель, ул. …" className={field} />
      </div>
      <div>
        <label htmlFor="d-what" className="mb-2 block font-semibold">
          Что нужно привезти
        </label>
        <textarea id="d-what" rows={3} value={what} onChange={(e) => setWhat(e.target.value)} placeholder="Например: 10 мешков штукатурки, 2 листа ГКЛ" className={field} />
        {items.length > 0 && (
          <p className="mt-2 text-sm text-muted">В список добавлено товаров: {items.length}. Они уйдут в WhatsApp вместе с сообщением.</p>
        )}
      </div>
      <div>
        <label htmlFor="d-when" className="mb-2 block font-semibold">
          Когда нужно (необязательно)
        </label>
        <input id="d-when" value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Сегодня, завтра, до 15:00" className={field} />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-brand">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-semibold text-white hover:bg-brand-dark sm:w-auto"
      >
        <IconWhatsApp />
        Отправить в WhatsApp
      </button>
      <p className="text-sm text-muted">Откроется WhatsApp с готовым текстом. Стоимость и сроки доставки подскажем в переписке.</p>
    </form>
  );
}
