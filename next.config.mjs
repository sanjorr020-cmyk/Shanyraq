/**
 * Заголовки безопасности для всех страниц.
 * CSP разрешает только свой домен и два счётчика аналитики (грузятся после согласия посетителя).
 * 'unsafe-inline' для скриптов нужен Next.js для гидратации; снять можно, перейдя на nonce/hash.
 */
const ANALYTICS_SCRIPT = "https://mc.yandex.ru https://www.googletagmanager.com";
const ANALYTICS_CONNECT = "https://mc.yandex.ru https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${ANALYTICS_SCRIPT}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://mc.yandex.ru https://www.google-analytics.com",
  "font-src 'self' data:",
  `connect-src 'self' ${ANALYTICS_CONNECT}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
