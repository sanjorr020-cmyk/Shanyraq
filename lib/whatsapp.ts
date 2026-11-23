import { siteData } from "@/lib/content";

export function waLink(text?: string): string {
  const base = `https://wa.me/${siteData.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function productQuestion(name: string): string {
  return `Здравствуйте! Подскажите, есть ли в наличии и какая цена: ${name}.`;
}

export function listMessage(items: { name: string; qty: number }[]): string {
  const lines = items.map((item, i) => `${i + 1}. ${item.name} — ${item.qty} шт.`);
  return ["Здравствуйте! Хочу узнать наличие и цену:", ...lines].join("\n");
}

export function calcMessage(material: string, area: number, thickness: number, unit: string, packs: number, packLabel: string): string {
  return [
    "Здравствуйте! Посчитал(а) на сайте:",
    `${material}, площадь ${area} м², толщина/слои ${thickness}.`,
    `Нужно примерно ${packs} упаковок (${packLabel}).`,
    "Подскажите наличие и цену.",
  ].join("\n");
}

export const generalQuestion = "Здравствуйте! Хочу узнать наличие и цену.";
export const builderQuestion = "Здравствуйте! Я строитель / бригада. Хочу узнать условия оптового расчёта.";
