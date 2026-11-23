import { IconClock, IconPhone, IconPin, IconRoute, IconWhatsApp } from "@/components/Icons";
import Reviews from "@/components/Reviews";
import { siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

/**
 * Блок «Контакты» перед подвалом.
 * Карта — статичная SVG-схема, без встроенного виджета и без сторонних cookie до клика.
 */
export default function ContactsBlock() {
  const btn =
    "btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold";
  return (
    <section id="contacts" className="band-white" aria-labelledby="contacts-title">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 id="contacts-title" className="text-3xl font-bold tracking-tight">
            Как нас найти
          </h2>

          <ul className="mt-8 space-y-5 text-[16px]">
            <li className="flex gap-3">
              <IconPin className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Адрес</span>
                <span className="text-muted">{siteData.address.full}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <IconClock className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Часы работы</span>
                <span className="text-muted">{siteData.hours.text}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <IconRoute className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Остановка</span>
                <span className="text-muted">{siteData.landmark}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <IconPhone className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Телефон</span>
                <a href={`tel:${siteData.phone.tel}`} className="text-muted hover:text-brand">
                  {siteData.phone.display}
                </a>
              </span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(generalQuestion)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} bg-brand text-white hover:bg-brand-dark`}
            >
              <IconWhatsApp />
              WhatsApp
            </a>
            <a href={`tel:${siteData.phone.tel}`} className={`${btn} border border-line hover:border-ink`}>
              <IconPhone />
              Позвонить
            </a>
            <a
              href={siteData.rating.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-line hover:border-ink`}
            >
              <IconRoute />
              Маршрут в 2ГИС
            </a>
          </div>

          <Reviews />
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={siteData.rating.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lift block overflow-hidden rounded-2xl border border-line bg-surface"
            aria-label="Открыть магазин на карте в 2ГИС"
          >
            <img
              src="/map-schematic.svg"
              alt="Схема: магазин Shanyraq на ул. Акан Серы, остановка на ул. Дружбы в 2 минутах пешком"
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </a>
          <a
            href={siteData.rating.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            Открыть в 2ГИС
          </a>
        </div>
      </div>
    </section>
  );
}
