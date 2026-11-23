"use client";

import { IconClose, IconList, IconWhatsApp } from "@/components/Icons";
import { listHref, useList } from "@/components/ListContext";

export default function ListPanel() {
  const { items, open, setOpen, remove, setQty, clear } = useList();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="list-title">
      <button
        type="button"
        aria-label="Закрыть список"
        className="absolute inset-0 bg-ink/40"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="list-title" className="text-lg font-semibold">
            Мой список
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn rounded-full p-2 hover:bg-surface"
            aria-label="Закрыть"
          >
            <IconClose />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start gap-3 px-5 py-8">
            <IconList className="text-muted" />
            <p className="text-muted">
              Список пуст. Нажмите «Добавить в список» у нужных товаров, а потом отправьте весь список в WhatsApp.
            </p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-snug">{item.name}</p>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="mt-1 text-sm text-muted underline underline-offset-4 hover:text-brand"
                  >
                    Убрать
                  </button>
                </div>
                <label className="sr-only" htmlFor={`qty-${item.id}`}>
                  Количество: {item.name}
                </label>
                <div className="flex items-center rounded-lg border border-line">
                  <button
                    type="button"
                    className="px-3 py-2 text-lg"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label="Меньше"
                  >
                    −
                  </button>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    max={99}
                    value={item.qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value) || 1)}
                    className="w-12 bg-transparent text-center tabular-nums outline-none"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-lg"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    aria-label="Больше"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="space-y-3 border-t border-line px-5 py-4">
            <a
              href={listHref(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-semibold text-white hover:bg-brand-dark"
            >
              <IconWhatsApp />
              Отправить список в WhatsApp
            </a>
            <p className="text-sm text-muted">Цены и наличие ответим в WhatsApp. Оплата не онлайн.</p>
            <button type="button" onClick={clear} className="text-sm text-muted underline underline-offset-4">
              Очистить список
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
