"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { listMessage, waLink } from "@/lib/whatsapp";

export type ListItem = { id: string; name: string; qty: number };

type ListState = {
  items: ListItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, name: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: number;
};

const KEY = "shanyraq-list";
const Ctx = createContext<ListState | null>(null);

function readStorage(): ListItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ListItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(items: ListItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable (private mode): list works for this page view only */
  }
}

export function ListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStorage(items);
  }, [items, ready]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const add = useCallback((id: string, name: string) => {
    setItems((prev) => (prev.some((i) => i.id === id) ? prev : [...prev, { id, name, qty: 1 }]));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const value = useMemo<ListState>(
    () => ({ items, open, setOpen, add, remove, setQty, clear, has, count: items.length }),
    [items, open, add, remove, setQty, clear, has],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useList(): ListState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useList must be used inside ListProvider");
  return ctx;
}

export function listHref(items: ListItem[]): string {
  return waLink(listMessage(items));
}
