import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { calculator } from "@/lib/content";

export const metadata: Metadata = {
  title: "Калькулятор материалов",
  description: "Калькулятор: сколько штукатурки, клея, наливного пола или краски нужно на вашу площадь. Примерный расчёт.",
};

export default function CalculatorPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Калькулятор материалов</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Выберите материал, площадь и толщину слоя. Покажем примерное количество упаковок с запасом{" "}
        {calculator.wastePercent}%.
      </p>
      <div className="mt-10">
        <Calculator />
      </div>
      <details className="mt-12 max-w-2xl rounded-2xl border border-line p-5">
        <summary className="cursor-pointer font-semibold">Откуда расход</summary>
        <p className="mt-3 text-muted">
          Значения — типовые, их сверяют по техническим листам производителей. До запуска этот список нужно проверить:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {calculator.sourcesToOpen.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
