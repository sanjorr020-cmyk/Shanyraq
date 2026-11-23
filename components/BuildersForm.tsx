"use client";

import { useState, type FormEvent } from "react";
import { IconWhatsApp } from "@/components/Icons";
import { waLink } from "@/lib/whatsapp";

/**
 * Заявка без сервера: собирает текст и открывает WhatsApp.
 * Данные никуда не отправляются, кроме чата владельца, который клиент открывает сам.
 */
export default function BuildersForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Укажите имя и телефон.");
      return;
    }
    if (!agree) {
      setError("Отметьте согласие на обработку контактов.");
      return;
    }
    setError("");
    const text = [
      "Здравствуйте! Заявка на оптовый расчёт для строителей.",
      `Имя: ${name.trim()}`,
      company.trim() ? `Компания / бригада: ${company.trim()}` : "",
      `Телефон: ${phone.trim()}`,
      volume.trim() ? `Примерный объём закупок: ${volume.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="b-name" className="mb-2 block font-semibold">
          Имя
        </label>
        <input id="b-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="b-company" className="mb-2 block font-semibold">
          Компания или бригада (необязательно)
        </label>
        <input id="b-company" value={company} onChange={(e) => setCompany(e.target.value)} className={field} />
      </div>
      <div>
        <label htmlFor="b-phone" className="mb-2 block font-semibold">
          Телефон
        </label>
        <input
          id="b-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="+7"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="b-volume" className="mb-2 block font-semibold">
          Примерный объём закупок (необязательно)
        </label>
        <input id="b-volume" value={volume} onChange={(e) => setVolume(e.target.value)} className={field} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-accent" />
        <span>
          Согласен(на) на обработку имени и телефона для ответа на заявку. Подробнее — в{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-brand">
            политике конфиденциальности
          </a>
          .
        </span>
      </label>

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
        Отправить заявку в WhatsApp
      </button>
      <p className="text-sm text-muted">Откроется WhatsApp с готовым текстом. Отправить его нужно будет вам самим.</p>
    </form>
  );
}
