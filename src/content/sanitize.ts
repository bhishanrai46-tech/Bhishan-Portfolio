import { defaultContent } from "./default";
import { sanitizeTheme } from "./theme";
import type { Content, SectionMeta } from "./types";

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/**
 * Turns whatever is stored (or sent by the browser) into valid content:
 * missing parts fall back to the defaults, and the theme only accepts known-safe values.
 */
export function sanitizeContent(raw: unknown): Content {
  const defaults = structuredClone(defaultContent) as unknown as Record<string, unknown>;
  if (!isObj(raw)) return defaults as unknown as Content;

  const out: Record<string, unknown> = {};
  for (const key of Object.keys(defaults)) {
    const dv = defaults[key];
    const rv = raw[key];
    if (rv === undefined || Array.isArray(rv) !== Array.isArray(dv) || typeof rv !== typeof dv) out[key] = dv;
    else if (isObj(dv) && isObj(rv)) out[key] = { ...dv, ...rv };
    else out[key] = rv;
  }

  // Keep every known section, in the saved order; add any new ones at the end.
  const known = defaultContent.sections;
  const saved = (Array.isArray(out.sections) ? out.sections : []).filter(
    (s): s is SectionMeta => isObj(s) && known.some((k) => k.id === s.id),
  );
  for (const k of known) if (!saved.some((s) => s.id === k.id)) saved.push(structuredClone(k));
  out.sections = saved;

  out.theme = sanitizeTheme(out.theme);
  return out as unknown as Content;
}

/** What visitors may see: drafts are left out. */
export function publicContent(c: Content): Content {
  return {
    ...c,
    projects: c.projects.filter((p) => !p.draft),
    notes: c.notes.filter((n) => !n.draft),
    pages: c.pages.filter((p) => !p.draft),
  };
}
