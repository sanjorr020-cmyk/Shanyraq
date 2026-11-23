"use client";

import Link from "next/link";
import { useState } from "react";
import { IconClose, IconList, IconMenu, IconPhone, IconSearch, IconWhatsApp } from "@/components/Icons";
import { useList } from "@/components/ListContext";
import { generalQuestion, waLink } from "@/lib/whatsapp";
import { siteData } from "@/lib/content";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/builders", label: "Строителям" },
  { href: "/delivery", label: "Доставка" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useList();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link href="/" aria-label="Shanyraq — на главную" className="shrink-0">
          {/* Временный логотип; выбранный вариант подставляется сюда */}
          <img src="/logo/logo-4-horizontal-header.svg" alt="Shanyraq" width={203} height={36} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Основное меню" className="ml-6 hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-[15px] text-ink hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <a
            href={`tel:${siteData.phone.tel}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium hover:bg-surface xl:flex"
          >
            <IconPhone />
            {siteData.phone.display}
          </a>
          <Link href="/search" className="btn rounded-full p-2.5 hover:bg-surface" aria-label="Поиск по товарам">
            <IconSearch />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn relative rounded-full p-2.5 hover:bg-surface"
            aria-label={`Мой список, товаров: ${count}`}
          >
            <IconList />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </button>
          <a
            href={waLink(generalQuestion)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn hidden items-center gap-2 whitespace-nowrap rounded-xl bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-dark md:flex"
          >
            <IconWhatsApp />
            Узнать наличие
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="btn rounded-full p-2.5 hover:bg-surface lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Мобильное меню" className="border-t border-line bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 md:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-line py-4 text-lg font-medium last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <a href={`tel:${siteData.phone.tel}`} className="text-lg font-semibold">
                {siteData.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
