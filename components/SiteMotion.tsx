"use client";

import { useEffect } from "react";

/**
 * Мягкая анимация сайта:
 * - плавный скролл (Lenis);
 * - появление секций при прокрутке (Motion): fade + сдвиг 14px, 450ms.
 * Если у посетителя включено «уменьшить движение» (prefers-reduced-motion), ничего не запускается.
 * Без JavaScript контент виден сразу.
 */
export default function SiteMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Lenis и Motion грузим после первой отрисовки и события load: не мешают LCP
    const start = async () => {
      const [{ default: Lenis }, { animate, inView }] = await Promise.all([import("lenis"), import("motion")]);
      if (cancelled) return;
      cleanup = init(Lenis, animate, inView);
    };
    const onLoad = () => setTimeout(start, 0);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      cleanup?.();
    };
  }, []);

  return null;
}

type LenisCtor = typeof import("lenis").default;
type Animate = typeof import("motion").animate;
type InView = typeof import("motion").inView;

function init(Lenis: LenisCtor, animate: Animate, inView: InView): () => void {
  {
    // Плавный скролл
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Появление секций при прокрутке
    // Первый экран не скрываем: он виден сразу (LCP), у него своё появление через CSS (.enter)
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.pattern-hero)"));
    const stops: Array<() => void> = [];
    sections.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      stops.push(
        inView(
          el,
          () => {
            animate(el, { opacity: 1, transform: "translateY(0px)" }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
          },
          { margin: "0px 0px -8% 0px" },
        ),
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      stops.forEach((stop) => stop());
      sections.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }
}
