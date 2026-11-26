/** Links and image addresses come from editable content, so only allow safe kinds. */
export function safeHref(href: unknown): string {
  const v = typeof href === "string" ? href.trim() : "";
  if (!v) return "#";
  if (v.startsWith("/") || v.startsWith("#")) return v;
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  return "#";
}

export function safeSrc(src: unknown): string {
  const v = typeof src === "string" ? src.trim() : "";
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (/^https:\/\//i.test(v)) return v;
  return "";
}

export function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "");
  return s || "untitled";
}

export function uniqueSlug(base: string, taken: string[]): string {
  let slug = slugify(base);
  let n = 2;
  while (taken.includes(slug)) slug = `${slugify(base)}-${n++}`;
  return slug;
}
