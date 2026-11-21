import type { MetadataRoute } from "next";
import { notes, projects, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
