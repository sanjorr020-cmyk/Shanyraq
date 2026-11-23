import type { Metadata, Viewport } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import ListPanel from "@/components/ListPanel";
import { ListProvider } from "@/components/ListContext";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import SiteMotion from "@/components/SiteMotion";
import JsonLd from "@/components/JsonLd";
import { siteData } from "@/lib/content";

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: {
    default: "Shanyraq — строительный магазин в Караоткеле",
    template: "%s — Shanyraq",
  },
  description:
    "Строительный магазин Shanyraq в Караоткеле (Целиноградский район, рядом с Астаной). Сантехника, сухие смеси, электроинструмент, крепёж, краски. Ежедневно 09:00–19:00. Наличие и цену уточняйте в WhatsApp.",
  applicationName: "Shanyraq",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Shanyraq",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={golos.variable}>
      <body className="min-h-screen antialiased">
        <ListProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
          >
            Перейти к содержимому
          </a>
          <Header />
          <main id="main" className="pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBar />
          <ListPanel />
          <SiteMotion />
          <CookieConsent />
        </ListProvider>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
