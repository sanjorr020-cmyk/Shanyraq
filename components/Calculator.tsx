"use client";

import { useMemo, useState } from "react";
import { IconWhatsApp } from "@/components/Icons";
import { calcMessage, waLink } from "@/lib/whatsapp";
import { calculator, type Material } from "@/lib/content";

export default function Calculator() {
  const materials = calculator.materials;
  const [materialId, setMaterialId] = useState<string>(materials[0].id);
  const material: Material = materials.find((m) => m.id === materialId) ?? materials[0];
  const [area, setArea] = useState<number>(20);
  const [thickness, setThickness] = useState<number>(material.defaultThickness);

  const result = useMemo(() => {
    const waste = 1 + calculator.wastePercent / 100;
    const need = area * material.ratePerM2PerUnit * thickness * waste;
    const packs = need > 0 ? Math.ceil(need / material.packSize) : 0;
    return { need: Math.round(need * 10) / 10, packs };
  }, [area, thickness, material]);

  const isCoats = material.mode === "coats";

  function onMaterial(id: string) {
    const m = materials.find((x) => x.id === id);
    setMaterialId(id);
    if (m) setThickness(m.defaultThickness);
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="material" className="mb-2 block font-semibold">
            Материал
          </label>
          <select
            id="material"
            value={materialId}
            onChange={(e) => onMaterial(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-accent"
          >
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className="mb-2 block font-semibold">
            Площадь, м²
          </label>
          <input
            id="area"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.5"
            value={area}
            onChange={(e) => setArea(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="thickness" className="mb-2 block font-semibold">
            {isCoats ? "Количество слоёв" : "Толщина слоя, мм"}
          </label>
          <input
            id="thickness"
            type="number"
            inputMode="decimal"
            min={0}
            step={isCoats ? 1 : 0.5}
            value={thickness}
            onChange={(e) => setThickness(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-accent"
          />
        </div>
      </form>

      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-6">
        <div>
          <p className="text-sm text-muted">Примерно понадобится</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {result.packs} {result.packs === 1 ? "упаковка" : result.packs < 5 ? "упаковки" : "упаковок"}
          </p>
          <p className="mt-2 text-muted">
            {material.packLabel}. Всего материала с запасом {calculator.wastePercent}%: {result.need} {material.unit}.
          </p>
        </div>

        <p className="text-sm text-muted">
          Примерный расчёт. Фактический расход зависит от основания, инструмента и производителя. Точное количество и
          наличие уточните в WhatsApp.
        </p>

        <a
          href={waLink(calcMessage(material.name, area, thickness, material.unit, result.packs, material.packLabel))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-semibold text-white hover:bg-brand-dark"
        >
          <IconWhatsApp />
          Отправить расчёт в WhatsApp
        </a>
      </div>
    </div>
  );
}
