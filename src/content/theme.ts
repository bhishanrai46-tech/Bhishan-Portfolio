import type { Theme } from "./types";

export const defaultTheme: Theme = {
  ink: "#111214",
  paper: "#f5f4f0",
  paper2: "#ebe9e2",
  bronze: "#a67c52",
  bronzeDeep: "#86602f",
  headingFont: "Instrument Serif",
  bodyFont: "Inter",
  scale: 100,
};

/** `google` is the exact Google Fonts family spec. Fonts without it are bundled with the site. */
export type FontOption = { name: string; google?: string };

export const HEADING_FONTS: FontOption[] = [
  { name: "Instrument Serif" },
  { name: "Playfair Display", google: "Playfair+Display:wght@400;500" },
  { name: "Cormorant Garamond", google: "Cormorant+Garamond:wght@400;500" },
  { name: "DM Serif Display", google: "DM+Serif+Display" },
  { name: "Fraunces", google: "Fraunces:wght@400;500" },
  { name: "Bebas Neue", google: "Bebas+Neue" },
  { name: "Syne", google: "Syne:wght@400;500" },
  { name: "Space Grotesk", google: "Space+Grotesk:wght@400;500" },
  { name: "Poppins", google: "Poppins:wght@400;500" },
];

export const BODY_FONTS: FontOption[] = [
  { name: "Inter" },
  { name: "DM Sans", google: "DM+Sans:wght@400;500;600" },
  { name: "Manrope", google: "Manrope:wght@400;500;600" },
  { name: "IBM Plex Sans", google: "IBM+Plex+Sans:wght@400;500;600" },
  { name: "Work Sans", google: "Work+Sans:wght@400;500;600" },
  { name: "Poppins", google: "Poppins:wght@400;500;600" },
  { name: "Source Serif 4", google: "Source+Serif+4:wght@400;500;600" },
  { name: "Lora", google: "Lora:wght@400;500;600" },
];

const HEX = /^#[0-9a-f]{6}$/i;

const findFont = (list: FontOption[], name: unknown, fallback: string) =>
  list.find((f) => f.name === name)?.name ?? fallback;

/** Only allow known-safe values, so stored content can never inject CSS. */
export function sanitizeTheme(input: unknown): Theme {
  const t = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const color = (k: keyof Theme) => (typeof t[k] === "string" && HEX.test(t[k] as string) ? (t[k] as string) : (defaultTheme[k] as string));
  const scale = Number(t.scale);
  return {
    ink: color("ink"),
    paper: color("paper"),
    paper2: color("paper2"),
    bronze: color("bronze"),
    bronzeDeep: color("bronzeDeep"),
    headingFont: findFont(HEADING_FONTS, t.headingFont, defaultTheme.headingFont),
    bodyFont: findFont(BODY_FONTS, t.bodyFont, defaultTheme.bodyFont),
    scale: Number.isFinite(scale) ? Math.min(120, Math.max(85, Math.round(scale))) : 100,
  };
}

export function themeCss(raw: Theme): string {
  const t = sanitizeTheme(raw);
  const body = t.bodyFont === "Inter" ? `"Inter Variable"` : `"${t.bodyFont}"`;
  return (
    `:root{` +
    `--color-ink:${t.ink};--color-paper:${t.paper};--color-paper-2:${t.paper2};` +
    `--color-bronze:${t.bronze};--color-bronze-deep:${t.bronzeDeep};` +
    `--color-ink-2:color-mix(in srgb,${t.ink} 96%,#fff);` +
    `--color-line-dark:color-mix(in srgb,${t.ink} 90%,#fff);` +
    `--color-line:color-mix(in srgb,${t.paper} 89%,#000);` +
    `--font-serif:"${t.headingFont}",Georgia,serif;` +
    `--font-sans:${body},ui-sans-serif,system-ui,sans-serif}` +
    `html{font-size:${t.scale}%}`
  );
}

export function fontsHref(raw: Theme): string | null {
  const t = sanitizeTheme(raw);
  const specs = [
    HEADING_FONTS.find((f) => f.name === t.headingFont)?.google,
    BODY_FONTS.find((f) => f.name === t.bodyFont)?.google,
  ].filter((s, i, a): s is string => !!s && a.indexOf(s) === i);
  if (!specs.length) return null;
  return `https://fonts.googleapis.com/css2?${specs.map((s) => `family=${s}`).join("&")}&display=swap`;
}
