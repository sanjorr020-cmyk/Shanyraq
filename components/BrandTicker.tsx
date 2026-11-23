import { siteData } from "@/lib/content";

/** Лента брендов: только названия текстом (без логотипов). Бегущая строка на CSS, пауза при наведении. */
export default function BrandTicker() {
  const items = siteData.brands;
  const cls = "shrink-0 px-6 text-2xl font-bold tracking-tight text-ink/80 md:text-3xl";
  return (
    <div className="ticker overflow-hidden border-y border-line py-6" aria-label="Бренды в наличии">
      <ul className="ticker-track">
        {items.map((b) => (
          <li key={b} className={cls}>
            {b}
          </li>
        ))}
        {items.map((b) => (
          <li key={`dup-${b}`} aria-hidden="true" className={cls}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
