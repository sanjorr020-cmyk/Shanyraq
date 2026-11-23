import { siteData } from "@/lib/content";

/** Частые вопросы. Где ответа ещё нет — «уточнить», без выдуманных условий. */
const items: { q: string; a: string }[] = [
  {
    q: "Есть ли доставка?",
    a: `${siteData.delivery}. Стоимость и сроки уточнить у владельца.`,
  },
  {
    q: "Можно ли оплатить по QR-коду?",
    a: "Да, оплата по QR-коду указана в карточке магазина. Перед запуском уточнить у владельца.",
  },
  {
    q: "Можно ли отложить товар?",
    a: "Уточнить у владельца: условия брони и срок хранения. Напишите в WhatsApp, что нужно отложить.",
  },
  {
    q: "Работаете ли вы со строителями и бригадами?",
    a: "Да, есть отдельная страница для строителей и бригад с оптовым расчётом. Скидки и условия по объёму — уточнить у владельца.",
  },
  {
    q: "Можно ли узнать цену по телефону или в WhatsApp?",
    a: `Да. Цены и наличие отвечаем в WhatsApp: ${siteData.phone.display}.`,
  },
];

export default function Faq() {
  return (
    <section className="band-warm" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <h2 id="faq-title" className="text-3xl font-bold tracking-tight">
          Частые вопросы
        </h2>
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
          {items.map((it) => (
            <details key={it.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {it.q}
                <span aria-hidden className="text-xl text-muted group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
