import Link from "next/link";
import { IconClock, IconPhone, IconPin } from "@/components/Icons";
import { siteData } from "@/lib/content";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/calculator", label: "Калькулятор материалов" },
  { href: "/brands", label: "Бренды" },
  { href: "/builders", label: "Для строителей и бригад" },
  { href: "/delivery", label: "Доставка и оплата" },
  { href: "/contacts", label: "Контакты" },
  { href: "/about", label: "О магазине" },
  { href: "/privacy", label: "Политика конфиденциальности" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <img src="/logo/logo-4-horizontal-header.svg" alt="Shanyraq" width={225} height={40} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-muted">{siteData.tagline}</p>
        </div>

        <div className="space-y-4">
          <p className="flex items-start gap-3">
            <IconPin className="mt-0.5 shrink-0 text-muted" />
            <span>{siteData.address.full}</span>
          </p>
          <p className="flex items-start gap-3">
            <IconClock className="mt-0.5 shrink-0 text-muted" />
            <span>{siteData.hours.text}</span>
          </p>
          <p className="flex items-start gap-3">
            <IconPhone className="mt-0.5 shrink-0 text-muted" />
            <a href={`tel:${siteData.phone.tel}`} className="font-medium hover:text-brand">
              {siteData.phone.display}
            </a>
          </p>
        </div>

        <nav aria-label="Разделы сайта">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-muted md:px-6">
          © {new Date().getFullYear()} Shanyraq. Строительный магазин, {siteData.address.locality}. Рейтинг{" "}
          {siteData.rating.value} в {siteData.rating.source} ({siteData.rating.count} оценок).
        </p>
      </div>
    </footer>
  );
}
