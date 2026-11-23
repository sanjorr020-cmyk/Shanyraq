import { IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { siteData } from "@/lib/content";
import { generalQuestion, waLink } from "@/lib/whatsapp";

/** Закреплённая внизу панель на телефоне: WhatsApp, звонок, карта. */
export default function MobileBar() {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium text-ink active:bg-surface";
  return (
    <nav
      aria-label="Быстрые действия"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex">
        <a href={waLink(generalQuestion)} target="_blank" rel="noopener noreferrer" className={`${item} text-brand`}>
          <IconWhatsApp />
          WhatsApp
        </a>
        <a href={`tel:${siteData.phone.tel}`} className={item}>
          <IconPhone />
          Позвонить
        </a>
        <a href={siteData.rating.url} target="_blank" rel="noopener noreferrer" className={item}>
          <IconPin />
          Карта
        </a>
      </div>
    </nav>
  );
}
