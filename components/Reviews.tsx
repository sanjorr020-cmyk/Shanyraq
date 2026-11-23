import reviewsData from "@/content/reviews.json";
import { siteData } from "@/lib/content";

type Review = { author: string; date: string; text: string; url: string };

/**
 * Отзывы из 2ГИС. Выводится только при наличии реальных данных в content/reviews.json.
 * Текст не редактируется: берётся как есть, с датой и ссылкой на источник.
 */
export default function Reviews() {
  const items = reviewsData.items as Review[];
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="reviews-title" className="mt-6">
      <h3 id="reviews-title" className="text-lg font-semibold">
        Отзывы в {siteData.rating.source}
      </h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((r) => (
          <li key={`${r.author}-${r.date}`} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-sm text-muted">
              {r.author}, {r.date}
            </p>
            <p className="mt-2">{r.text}</p>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
              Отзыв в {siteData.rating.source}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
