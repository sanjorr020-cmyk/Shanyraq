import type { MetadataRoute } from "next";
import { categories, siteData } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteData.siteUrl.replace(/\/$/, "");
  const staticPaths = ["/", "/catalog", "/search", "/calculator", "/brands", "/builders", "/delivery", "/contacts", "/about", "/privacy"];
  const catPaths = categories.map((c) => `/catalog/${c.slug}`);
  const now = new Date();
  return [...staticPaths, ...catPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/catalog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/catalog/") ? 0.8 : 0.6,
  }));
}
