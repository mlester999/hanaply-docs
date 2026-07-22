import type { MetadataRoute } from "next";
import { docs } from "@/content/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hanaply.com";
  return ["", "/roadmap", "/architecture", "/docs", ...docs.map((doc) => `/docs/${doc.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-07-22"), changeFrequency: path === "" ? "monthly" : "weekly", priority: path === "" ? 1 : 0.7 }));
}
