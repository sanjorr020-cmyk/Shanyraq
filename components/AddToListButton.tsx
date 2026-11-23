"use client";

import { IconCheck, IconList } from "@/components/Icons";
import { useList } from "@/components/ListContext";

export default function AddToListButton({ id, name }: { id: string; name: string }) {
  const { has, add, remove } = useList();
  const inList = has(id);

  return (
    <button
      type="button"
      onClick={() => (inList ? remove(id) : add(id, name))}
      aria-pressed={inList}
      className={`btn inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[15px] font-medium ${
        inList ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:border-ink"
      }`}
    >
      {inList ? <IconCheck /> : <IconList />}
      {inList ? "В списке" : "Добавить в список"}
    </button>
  );
}
