"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "@/components/Analytics";

/**
 * Баннер согласия на cookie. Хранит только выбор посетителя (accepted / declined)
 * в его браузере. Персональные данные не собирает.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setShow(true);
    } catch {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  const choose = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* хранилище недоступно: баннер закроется до перезагрузки */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на cookie"
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-4 shadow-lg md:bottom-4"
    >
      <p className="text-sm leading-5">
        Счётчики — только с вашего согласия.{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-brand">
          Подробнее
        </Link>
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="btn rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Принять
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="btn rounded-xl border border-line px-4 py-2 text-sm font-semibold hover:border-ink"
        >
          Только необходимые
        </button>
      </div>
    </div>
  );
}
