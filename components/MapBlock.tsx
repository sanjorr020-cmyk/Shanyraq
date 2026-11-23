"use client";

import { useEffect, useRef, useState } from "react";
import { siteData } from "@/lib/content";
import { CONSENT_EVENT, CONSENT_KEY } from "@/components/Analytics";

/**
 * Карта магазина.
 * - Координаты из content/site.json → map. Пока пусто — заглушка «точка уточняется».
 * - iframe грузится только когда блок появился на экране (lazy) и после согласия на cookie
 *   (или по кнопке «Показать карту»).
 * - На телефоне карта не перехватывает прокрутку страницы: двигать карту можно после нажатия «Включить карту».
 */
export default function MapBlock() {
  const { lon, lat, zoom } = siteData.map;
  const hasPoint = typeof lon === "number" && typeof lat === "number";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  const [manual, setManual] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      try {
        setConsent(window.localStorage.getItem(CONSENT_KEY) === "accepted");
      } catch {
        setConsent(false);
      }
    };
    readConsent();
    window.addEventListener(CONSENT_EVENT, readConsent);
    return () => window.removeEventListener(CONSENT_EVENT, readConsent);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const loadMap = consent || manual;
  const src = hasPoint
    ? `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=${zoom}&pt=${lon}%2C${lat},pm2rdm`
    : "";
  const shell = "relative h-[320px] w-full overflow-hidden rounded-2xl border border-line bg-surface md:h-[360px]";

  return (
    <div ref={ref} className={shell}>
      {!hasPoint && (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-muted">
          <p className="font-semibold text-ink">Карта появится после уточнения точки</p>
          <p className="text-sm">Адрес: {siteData.address.full}</p>
        </div>
      )}

      {hasPoint && !loadMap && (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="max-w-xs text-sm text-muted">
            Карта подгружается сторонним сервисом. Загрузим её после вашего согласия на cookie или по кнопке.
          </p>
          <button
            type="button"
            onClick={() => setManual(true)}
            className="btn rounded-xl bg-ink px-5 py-2.5 font-semibold text-white hover:bg-black"
          >
            Показать карту
          </button>
        </div>
      )}

      {hasPoint && loadMap && visible && (
        <>
          <iframe
            title="Карта: магазин Shanyraq на ул. Акан Серы, 123, Караоткель"
            src={src}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className={`h-full w-full border-0 ${interactive ? "" : "pointer-events-none md:pointer-events-auto"}`}
            style={interactive ? { pointerEvents: "auto" } : undefined}
          />
          {!interactive && (
            <button
              type="button"
              onClick={() => setInteractive(true)}
              className="btn absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow md:hidden"
            >
              Включить карту
            </button>
          )}
        </>
      )}
    </div>
  );
}
