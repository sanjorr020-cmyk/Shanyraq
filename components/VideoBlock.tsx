import Placeholder from "@/components/Placeholder";
import { siteData } from "@/lib/content";

/**
 * Место под видео магазина. Пока видео нет, показываем заглушку с описанием кадра.
 * Когда ролик появится: указать video.src в content/site.json. Видео без автозапуска, с постером, metadata=none.
 */
export default function VideoBlock() {
  const v = siteData.video;
  return (
    <section className="band-warm" aria-labelledby="video-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 id="video-title" className="text-3xl font-bold tracking-tight">
          Как у нас в магазине
        </h2>
        <div className="mt-8 overflow-hidden rounded-2xl">
          {v.src ? (
            <video
              controls
              playsInline
              preload="none"
              poster={v.poster || undefined}
              className="aspect-video w-full bg-ink object-cover"
            >
              <source src={v.src} type="video/mp4" />
            </video>
          ) : (
            <Placeholder label="Видео магазина: вход, полки с сантехникой и электроинструментом, касса (снять)" ratio="16/9" />
          )}
        </div>
      </div>
    </section>
  );
}
