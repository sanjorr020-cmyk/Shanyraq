import type { Metadata } from "next";
import { siteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как магазин Shanyraq обрабатывает персональные данные посетителей сайта.",
  robots: { index: true, follow: true },
};

/**
 * ШАБЛОН. Текст подготовлен по Закону РК «О персональных данных и их защите».
 * Перед запуском проверить юристом: реквизиты оператора, сроки хранения, поручения обработчикам.
 */
export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Политика конфиденциальности</h1>
      <p className="mt-4 text-sm text-brand">Шаблон: до запуска проверить юристом (реквизиты оператора уточнить).</p>

      <div className="mt-8 space-y-5 leading-relaxed">
        <h2 className="pt-8 text-2xl font-semibold">1. Какие данные собираем</h2>
        <p>
          Сайт не требует регистрации. Персональные данные появляются только тогда, когда вы сами отправляете заявку
          (имя, телефон) из формы «Для строителей и бригад» или пишете в WhatsApp. Формы не отправляют данные на
          сервер сайта: открывается чат WhatsApp с готовым текстом.
        </p>

        <h2 className="pt-8 text-2xl font-semibold">2. Зачем</h2>
        <p>Чтобы ответить на вашу заявку или вопрос о наличии, цене и условиях.</p>

        <h2 className="pt-8 text-2xl font-semibold">3. Аналитика</h2>
        <p>
          Сайт может использовать счётчики посещаемости (Яндекс Метрика, Google Analytics), если они подключены. Они
          собирают обезличенную статистику просмотров.
        </p>

        <h2 className="pt-8 text-2xl font-semibold">4. Срок хранения и права</h2>
        <p>
          Данные хранятся столько, сколько нужно для ответа на обращение. Вы можете запросить уточнение, изменение или
          удаление своих данных, написав нам в WhatsApp или по телефону {siteData.phone.display}.
        </p>

        <h2 className="pt-8 text-2xl font-semibold">5. Контакты оператора</h2>
        <p>
          {siteData.name}, {siteData.address.full}. Телефон: {siteData.phone.display}. Реквизиты оператора — уточнить.
        </p>
      </div>
    </section>
  );
}
