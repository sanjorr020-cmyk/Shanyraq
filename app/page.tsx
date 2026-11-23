import Image from "next/image";
import Link from "next/link";
import HeroPattern from "@/components/HeroPattern";
import CategoryTile from "@/components/CategoryTile";
import Placeholder from "@/components/Placeholder";
import { IconArrow, IconCheck, IconClock, IconPhone, IconPin, IconRoute, IconTruck, IconWhatsApp } from "@/components/Icons";
import ContactsBlock from "@/components/ContactsBlock";
import BrandTicker from "@/components/BrandTicker";
import DeliveryForm from "@/components/DeliveryForm";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import VideoBlock from "@/components/VideoBlock";
import WhyUs from "@/components/WhyUs";
import { categories, siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <>
      {/* Первый экран: тёплый фон, декоративный узор из знака, оффер и два действия */}
      <section className="pattern-hero band-warm relative">
        <HeroPattern />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-2 md:px-6 md:pt-16">
          <div className="enter">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {siteData.address.locality}, {siteData.address.region}
            </p>
            <h1 className="hero-title mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Стройматериалы и сантехника в Караоткеле
            </h1>
            <p className="hero-sub mt-5 max-w-xl text-lg text-muted">
              Ежедневно с {siteData.hours.opens} до {siteData.hours.closes}. Ответим в WhatsApp: подскажем наличие и
              сравним варианты. Цены — по запросу.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(generalQuestion)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-dark"
              >
                <IconWhatsApp />
                Узнать наличие в WhatsApp
              </a>
              <Link
                href="/catalog"
                className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 font-semibold hover:border-ink"
              >
                Смотреть каталог
                <IconArrow />
              </Link>
            </div>
          </div>
          <div className="enter">
            <div className="overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "4/3" }}>
              {/* Фото: Unsplash, см. README (раздел «Фото») */}
              <Image
                src="/photos/hero-stroyka.jpg"
                alt="Строительство дома: деревянная крыша, кирпичная кладка и леса"
                width={720}
                height={540}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Сегменты: для кого магазин */}
      <section className="band-white" aria-labelledby="segments-title">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <h2 id="segments-title" className="sr-only">
            Что купить
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.segments.map((s) => (
              <Link key={s.href} href={s.href} className="lift group flex flex-col gap-3 rounded-2xl border border-line p-5">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">{s.text}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Перейти
                  <IconArrow width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="band-warm" aria-labelledby="cats-title">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="cats-title" className="text-3xl font-bold tracking-tight">
              Категории
            </h2>
            <Link href="/catalog" className="hidden text-sm font-semibold text-accent hover:underline sm:block">
              Весь каталог
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryTile key={c.slug} category={c} />
            ))}
            <Link
              href="/catalog"
              className="lift flex flex-col items-start justify-between rounded-2xl border border-dashed border-line bg-white p-6 text-accent"
            >
              <span className="text-lg font-semibold">Весь каталог</span>
              <IconArrow className="mt-8" />
            </Link>
          </div>
        </div>
      </section>

      {/* Калькулятор: графитовая полоса с белой карточкой */}
      <section className="band-ink" aria-labelledby="calc-title">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="grid items-center gap-8 rounded-3xl bg-white p-8 text-ink md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <h2 id="calc-title" className="text-3xl font-bold tracking-tight">
                Сколько материала на вашу площадь
              </h2>
              <p className="mt-4 max-w-lg text-muted">
                Введите площадь и толщину слоя — покажем, сколько упаковок штукатурки, клея или наливного пола нужно.
                Расчёт примерный, точное количество уточним в WhatsApp.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Link
                href="/calculator"
                className="btn inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-semibold text-white hover:bg-black"
              >
                Открыть калькулятор
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Бренды: лента текстом */}
      <section className="band-white" aria-labelledby="brands-title">
        <div className="mx-auto max-w-6xl px-4 pt-14 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 id="brands-title" className="text-3xl font-bold tracking-tight">
              Бренды в наличии
            </h2>
            <Link href="/brands" className="hidden text-sm font-semibold text-accent hover:underline sm:block">
              Все бренды
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted">Полный список и наличие уточняйте в WhatsApp.</p>
        </div>
        <div className="mt-8">
          <BrandTicker />
        </div>
      </section>

      {/* Почему нас выбирают: только проверяемые факты */}
      <WhyUs />

      {/* Доверие: рейтинг, часы, оплата, адрес */}
      <section className="band-warm" aria-labelledby="trust-title">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <h2 id="trust-title" className="sr-only">
            Магазин и контакты
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="lift rounded-2xl border border-line bg-white p-6">
              <p className="text-sm text-muted">Рейтинг в {siteData.rating.source}</p>
              <p className="mt-2 text-4xl font-bold tabular-nums">
                {siteData.rating.value}
                <span className="ml-2 text-lg font-medium text-muted">· {siteData.rating.count} оценок</span>
              </p>
              <a
                href={siteData.rating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Читать отзывы в {siteData.rating.source}
                <IconArrow width={16} height={16} />
              </a>
            </div>

            <div className="lift rounded-2xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 font-semibold">
                <IconClock /> {siteData.hours.text}
              </p>
              <p className="mt-4 flex items-start gap-2 text-muted">
                <IconPin className="mt-0.5 shrink-0" />
                <span>
                  {siteData.address.full}
                  <br />
                  {siteData.landmark}
                </span>
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={siteData.rating.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 font-medium hover:border-ink"
                >
                  <IconRoute />
                  Маршрут
                </a>
                <a
                  href={`tel:${siteData.phone.tel}`}
                  className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 font-medium hover:border-ink"
                >
                  <IconPhone />
                  {siteData.phone.display}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white p-6">
            <p className="font-semibold">Как можно оплатить</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {siteData.payments.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[15px]">
                  <IconCheck className="shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Доставка */}
      <section className="band-white" aria-labelledby="delivery-title">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="grid items-center gap-6 rounded-2xl border border-line p-6 md:grid-cols-[auto_1fr_auto] md:p-8">
            <IconTruck width={36} height={36} className="text-accent" />
            <div>
              <h2 id="delivery-title" className="text-2xl font-bold tracking-tight">
                Доставка
              </h2>
              <p className="mt-2 text-muted">{siteData.delivery}</p>
            </div>
            <a
              href={waLink("Здравствуйте! Подскажите условия доставки.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-ink"
            >
              Уточнить в WhatsApp
            </a>
          </div>
          <div className="mt-8">
            <DeliveryForm />
          </div>
        </div>
      </section>

      {/* Место под видео магазина (пока заглушка) */}
      <VideoBlock />

      {/* Финальный призыв */}
      <section className="band-warm">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="rounded-3xl bg-brand px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold tracking-tight">Не нашли нужное?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              Пришлите название или фото в WhatsApp — подберём. Подскажем наличие, аналог или поможем с расчётом.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink("Здравствуйте! Не нашёл нужный товар. Пришлю фото или название — подберите, пожалуйста.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand hover:bg-surface"
              >
                <IconWhatsApp />
                Прислать фото в WhatsApp
              </a>
              <a
                href={waLink(generalQuestion)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
              >
                Задать вопрос
              </a>
            </div>
          </div>
        </div>
      </section>

      <Faq />

      <ContactsBlock />
    </>
  );
}
