"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Плавное появление фото при прокрутке: IntersectionObserver + CSS, без библиотек.
 * Используем только для фото ниже первого экрана (фото первого экрана — LCP, их не трогаем).
 * Без JavaScript класс .js не ставится и фото видны сразу.
 */
export default function RevealMedia({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!enabled || seen) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, seen]);

  if (!enabled) return <>{children}</>;
  return (
    <div ref={ref} className={`reveal-media h-full w-full${seen ? " is-in" : ""}`}>
      {children}
    </div>
  );
}
