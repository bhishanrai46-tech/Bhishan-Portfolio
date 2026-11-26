import type { MetadataRoute } from "next";
import { publicContent } from "@/content/sanitize";
import { getContent } from "@/content/store";

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = publicContent(await getContent());
  const now = new Date();
  return [
    { url: base(), lastModified: now, priority: 1 },
    ...c.projects.map((p) => ({ url: `${base()}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...c.notes.map((n) => ({ url: `${base()}/notes/${n.slug}`, lastModified: now, priority: 0.5 })),
    ...c.pages.map((p) => ({ url: `${base()}/p/${p.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
