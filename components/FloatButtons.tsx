"use client";

import { useEffect, useState } from "react";
import { IconWhatsApp } from "@/components/Icons";
import { generalQuestion, waLink } from "@/lib/whatsapp";

/**
 * Плавающие кнопки:
 * - WhatsApp: только на десктопе (на телефоне уже есть нижняя панель);
 * - «наверх»: появляется после прокрутки ~800px. Прокрутку не перехватываем: обычный scrollTo.
 */
export default function FloatButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <a
        href={waLink(generalQuestion)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="btn fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5a] md:flex"
      >
        <IconWhatsApp width={28} height={28} />
      </a>

      {showTop && (
        <button
          type="button"
          onClick={toTop}
          aria-label="Наверх"
          className="btn fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md hover:border-ink md:bottom-6 md:right-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}
