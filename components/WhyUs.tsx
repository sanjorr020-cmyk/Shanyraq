import { IconCheck, IconClock, IconPin, IconRoute } from "@/components/Icons";
import { siteData } from "@/lib/content";

/**
 * «Почему нас выбирают» — только проверяемые факты:
 * рейтинг и число оценок из 2ГИС, часы, способы оплаты, ориентир. Без обещаний и «лучших цен».
 */
export default function WhyUs() {
  const cards = [
    {
      icon: <IconCheck width={28} height={28} className="text-accent" />,
      title: `${siteData.rating.value} в ${siteData.rating.source}`,
      text: `${siteData.rating.count} оценок. Отзывы можно прочитать в карточке магазина.`,
      href: siteData.rating.url,
    },
    {
      icon: <IconClock width={28} height={28} className="text-accent" />,
      title: siteData.hours.text,
      text: "Работаем каждый день. Наличие и цену подскажем в WhatsApp.",
    },
    {
      icon: <IconCheck width={28} height={28} className="text-accent" />,
      title: "Несколько способов оплаты",
      text: siteData.payments.join(", ") + ".",
    },
    {
      icon: <IconRoute width={28} height={28} className="text-accent" />,
      title: "Рядом с остановкой",
      text: `${siteData.landmark}.`,
    },
  ];
  return (
    <section className="band-white" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 id="why-title" className="text-3xl font-bold tracking-tight">
          Почему нас выбирают
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="lift flex flex-col gap-3 rounded-2xl border border-line bg-white p-6">
              {c.icon}
              <p className="text-lg font-semibold leading-snug">{c.title}</p>
              <p className="text-sm text-muted">{c.text}</p>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm font-semibold text-accent hover:underline">
                  Открыть в {siteData.rating.source}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
