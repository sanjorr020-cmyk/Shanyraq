import { siteData } from "@/lib/content";

/**
 * Разметка локального бизнеса. Рейтинг намеренно НЕ добавлен как aggregateRating:
 * Google не засчитывает его без отзывов на самом сайте. Рейтинг показан текстом со ссылкой на 2ГИС.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: siteData.name,
    description: siteData.tagline,
    url: siteData.siteUrl,
    telephone: siteData.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.locality,
      addressRegion: siteData.address.region,
      addressCountry: siteData.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: siteData.hours.opens,
        closes: siteData.hours.closes,
      },
    ],
    paymentAccepted: siteData.payments.join(", "),
    sameAs: [siteData.rating.url],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
