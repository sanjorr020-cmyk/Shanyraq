import Link from "next/link";
import { IconArrow, IconWhatsApp } from "@/components/Icons";
import { generalQuestion, waLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Ошибка 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Такой страницы нет</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Возможно, ссылка устарела. Найдите товар через каталог или напишите нам в WhatsApp — подскажем.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-ink"
        >
          На главную
          <IconArrow width={16} height={16} />
        </Link>
        <a
          href={waLink(generalQuestion)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          <IconWhatsApp />
          Написать в WhatsApp
        </a>
      </div>
    </section>
  );
}
