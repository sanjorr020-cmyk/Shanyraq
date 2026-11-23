"use client";

import { useEffect } from "react";
import { siteData } from "@/lib/content";

export const CONSENT_KEY = "shanyraq-consent";
export const CONSENT_EVENT = "shanyraq-consent-changed";

/**
 * Аналитика грузится ТОЛЬКО после согласия посетителя (баннер cookie).
 * Без согласия скрипты Метрики и GA не загружаются вовсе.
 * ID берутся из content/site.json → analytics; пустые значения — ничего не подключается.
 */
export default function Analytics() {
  useEffect(() => {
    const load = () => {
      let consent: string | null = null;
      try {
        consent = window.localStorage.getItem(CONSENT_KEY);
      } catch {
        consent = null;
      }
      if (consent !== "accepted") return;
      if (document.getElementById("analytics-loaded")) return;

      const marker = document.createElement("meta");
      marker.id = "analytics-loaded";
      document.head.appendChild(marker);

      const ym = siteData.analytics.yandexMetrikaId;
      const ga = siteData.analytics.ga4Id;

      if (ym) {
        const s = document.createElement("script");
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/tag.js";
        document.head.appendChild(s);
        const init = document.createElement("script");
        init.textContent = `window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};window.ym.l=1*new Date();ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`;
        document.head.appendChild(init);
      }

      if (ga) {
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
        document.head.appendChild(s);
        const init = document.createElement("script");
        init.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`;
        document.head.appendChild(init);
      }
    };

    load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, []);

  return null;
}
