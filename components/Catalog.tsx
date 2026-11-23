"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { IconClose, IconSearch, IconWhatsApp } from "@/components/Icons";
import { categories, siteData } from "@/lib/content";
import { popularQueries, products, purposes, searchProducts, suggest, type Suggestion, type SearchProduct } from "@/lib/search";
import { waLink } from "@/lib/whatsapp";

/** Цены пока не показываем: блок цен и сортировка по цене скрыты до появления цен. */
const SHOW_PRICES = false;

type Sort = "popular" | "alpha";
type State = { q: string; cat: string; brand: string; purpose: string; sort: Sort };

const EMPTY: State = { q: "", cat: "", brand: "", purpose: "", sort: "popular" };

function readUrl(): State {
  if (typeof window === "undefined") return EMPTY;
  const sp = new URLSearchParams(window.location.search);
  const sort = sp.get("sort") === "alpha" ? "alpha" : "popular";
  return {
    q: sp.get("q") ?? "",
    cat: sp.get("cat") ?? "",
    brand: sp.get("brand") ?? "",
    purpose: sp.get("purpose") ?? "",
    sort,
  };
}

function writeUrl(s: State, lockedCat?: string) {
  const sp = new URLSearchParams();
  if (s.q) sp.set("q", s.q);
  if (s.cat && s.cat !== lockedCat) sp.set("cat", s.cat);
  if (s.brand) sp.set("brand", s.brand);
  if (s.purpose) sp.set("purpose", s.purpose);
  if (s.sort !== "popular") sp.set("sort", s.sort);
  const qs = sp.toString();
  const url = window.location.pathname + (qs ? `?${qs}` : "");
  window.history.replaceState(null, "", url);
}

export default function Catalog({ lockedCategory }: { lockedCategory?: string }) {
  const [s, setS] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);
  const [focus, setFocus] = useState(false);
  const [sheet, setSheet] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Фильтры и запрос из URL — после монтирования (чтобы не было расхождения при сборке)
  useEffect(() => {
    const init = readUrl();
    if (lockedCategory) init.cat = lockedCategory;
    setS(init);
    setReady(true);
  }, [lockedCategory]);

  useEffect(() => {
    if (ready) writeUrl(s, lockedCategory);
  }, [s, ready, lockedCategory]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocus(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const set = (patch: Partial<State>) => setS((prev) => ({ ...prev, ...patch }));
  const hasQuery = s.q.trim().length > 0;

  const results: SearchProduct[] = useMemo(() => {
    let list: SearchProduct[] = hasQuery ? searchProducts(s.q) : [...products];
    if (s.cat) list = list.filter((p) => p.category === s.cat);
    if (s.brand) list = list.filter((p) => p.brand === s.brand);
    if (s.purpose) list = list.filter((p) => p.purposes.includes(s.purpose));
    if (s.sort === "alpha") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "ru"));
    else if (!hasQuery) list = [...list].sort((a, b) => a.index - b.index);
    return list;
  }, [s, hasQuery]);

  const suggestions: Suggestion[] = useMemo(() => (focus ? suggest(s.q) : []), [focus, s.q]);

  const brandsInData = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)))),
    [],
  );

  const chips: { key: keyof State; label: string }[] = [];
  if (hasQuery) chips.push({ key: "q", label: `«${s.q}»` });
  if (s.cat && s.cat !== lockedCategory) chips.push({ key: "cat", label: categories.find((c) => c.slug === s.cat)?.title ?? s.cat });
  if (s.brand) chips.push({ key: "brand", label: s.brand });
  if (s.purpose) chips.push({ key: "purpose", label: purposes.find((p) => p.id === s.purpose)?.label ?? s.purpose });
  if (s.sort === "alpha") chips.push({ key: "sort", label: "По алфавиту" });

  const clearChip = (key: keyof State) => set({ [key]: key === "sort" ? "popular" : "" } as Partial<State>);
  const resetAll = () => set({ q: "", cat: lockedCategory ?? "", brand: "", purpose: "", sort: "popular" });

  const pickSuggestion = (sg: Suggestion) => {
    setFocus(false);
    if (sg.kind === "product") set({ q: sg.label });
    if (sg.kind === "category") set({ q: "", cat: sg.slug });
    if (sg.kind === "brand") set({ q: "", brand: sg.brand });
  };

  const askPhotoHref = waLink(
    `Здравствуйте! Ищу: ${s.q.trim() || "товар"}. ${s.q.trim() ? "" : "Пришлю фото."} Подберите, пожалуйста.`.replace(/\s+/g, " ").trim(),
  );

  const filtersBlock = (
    <div className="space-y-6">
      {!lockedCategory && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Категория</legend>
          <div className="flex flex-wrap gap-2">
            <Pill active={!s.cat} onClick={() => set({ cat: "" })}>Все</Pill>
            {categories.map((c) => (
              <Pill key={c.slug} active={s.cat === c.slug} onClick={() => set({ cat: c.slug })}>
                {c.title}
              </Pill>
            ))}
          </div>
        </fieldset>
      )}

      {brandsInData.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Бренд</legend>
          <div className="flex flex-wrap gap-2">
            <Pill active={!s.brand} onClick={() => set({ brand: "" })}>Все</Pill>
            {brandsInData.map((b) => (
              <Pill key={b} active={s.brand === b} onClick={() => set({ brand: b })}>
                {b}
              </Pill>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Назначение</legend>
        <div className="flex flex-wrap gap-2">
          <Pill active={!s.purpose} onClick={() => set({ purpose: "" })}>Все</Pill>
          {purposes.map((p) => (
            <Pill key={p.id} active={s.purpose === p.id} onClick={() => set({ purpose: p.id })}>
              {p.label}
            </Pill>
          ))}
        </div>
      </fieldset>

      {SHOW_PRICES && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Цена, ₸</legend>
          <div className="flex gap-2">
            <input inputMode="numeric" placeholder="от" className="w-full rounded-xl border border-line px-3 py-2" />
            <input inputMode="numeric" placeholder="до" className="w-full rounded-xl border border-line px-3 py-2" />
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Сортировка</legend>
        <select
          value={s.sort}
          onChange={(e) => set({ sort: e.target.value as Sort })}
          className="w-full rounded-xl border border-line bg-white px-3 py-2.5"
        >
          <option value="popular">Популярные</option>
          <option value="alpha">По алфавиту</option>
        </select>
        {!SHOW_PRICES && <p className="mt-2 text-sm text-muted">Сортировка по цене появится, когда опубликуем цены.</p>}
      </fieldset>
    </div>
  );

  return (
    <div>
      {/* Поиск */}
      <div ref={boxRef} className="relative">
        <label htmlFor="search" className="sr-only">
          Поиск по товарам
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-accent">
          <IconSearch className="shrink-0 text-muted" />
          <input
            id="search"
            type="search"
            autoComplete="off"
            value={s.q}
            onFocus={() => setFocus(true)}
            onChange={(e) => {
              set({ q: e.target.value });
              setFocus(true);
            }}
            placeholder="Например: герметик, Knauf, шпаклёвка"
            className="w-full bg-transparent py-3.5 text-base outline-none placeholder:text-muted"
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg" role="listbox">
            {suggestions.map((sg, i) => (
              <li key={`${sg.kind}-${i}`}>
                <button
                  type="button"
                  onClick={() => pickSuggestion(sg)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface"
                >
                  <span className="font-medium">{sg.label}</span>
                  <span className="text-sm text-muted">{sg.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!hasQuery && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">Часто ищут</p>
            <div className="flex flex-wrap gap-2">
              {popularQueries.map((q) => (
                <Pill key={q} active={false} onClick={() => set({ q })}>
                  {q}
                </Pill>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Фильтры: на десктопе — панель, на телефоне — кнопка и шторка */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setSheet(true)}
          className="rounded-xl border border-line px-4 py-2.5 font-semibold md:hidden"
        >
          Фильтры
        </button>
        <p className="hidden text-muted md:block">Найдено: {results.length}</p>
      </div>

      <div className="mt-4 hidden gap-8 md:grid md:grid-cols-[240px_1fr]">
        <aside aria-label="Фильтры">{filtersBlock}</aside>
        <div>{resultsBlock()}</div>
      </div>

      <div className="md:hidden">{resultsBlock()}</div>

      {/* Шторка фильтров на телефоне */}
      {sheet && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Фильтры">
          <button type="button" aria-label="Закрыть фильтры" className="absolute inset-0 bg-ink/40" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Фильтры</h2>
              <button type="button" onClick={() => setSheet(false)} className="rounded-full p-2 hover:bg-surface" aria-label="Закрыть">
                <IconClose />
              </button>
            </div>
            {filtersBlock}
            <div className="sticky bottom-0 -mx-5 mt-6 border-t border-line bg-white px-5 pt-4">
              <button
                type="button"
                onClick={() => setSheet(false)}
                className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white"
              >
                Показать {results.length} {results.length === 1 ? "товар" : results.length < 5 ? "товара" : "товаров"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function resultsBlock() {
    return (
      <div className="mt-6 md:mt-0">
        {chips.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <span key={c.key} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm">
                {c.label}
                <button type="button" onClick={() => clearChip(c.key)} aria-label={`Убрать: ${c.label}`} className="rounded-full p-0.5 hover:bg-line">
                  <IconClose width={14} height={14} />
                </button>
              </span>
            ))}
            <button type="button" onClick={resetAll} className="text-sm font-semibold text-accent hover:underline">
              Сбросить всё
            </button>
          </div>
        )}

        <p className="mb-4 text-muted md:hidden">Найдено: {results.length}</p>

        {results.length === 0 ? (
          <div className="rounded-2xl bg-surface p-6">
            <p className="text-lg font-semibold">Не нашли?</p>
            <p className="mt-2 text-muted">
              {hasQuery
                ? `По запросу «${s.q.trim()}» ничего нет в каталоге.`
                : "По выбранным фильтрам ничего нет."}{" "}
              Пришлите название или фото в WhatsApp — подберём.
            </p>
            <a
              href={askPhotoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
            >
              <IconWhatsApp />
              Написать в WhatsApp
            </a>
            <p className="mt-4 text-sm text-muted">
              Или позвоните: <a href={`tel:${siteData.phone.tel}`} className="underline underline-offset-4">{siteData.phone.display}</a>
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} categoryTitle={p.categoryTitle} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`btn rounded-full border px-3.5 py-2 text-sm font-medium ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
