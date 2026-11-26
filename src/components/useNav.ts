"use client";

import { useContent } from "./edit/ContentProvider";

/** Menu entries come from the Sections panel (which sections are in the menu) and any pages set to show in it. */
export function useNavItems() {
  const { content } = useContent();
  return [
    { label: "Home", href: "/#home" },
    ...content.sections.filter((s) => s.nav && s.visible).map((s) => ({ label: s.label, href: `/#${s.id}` })),
    ...content.pages.filter((p) => p.showInNav && !p.draft).map((p) => ({ label: p.title, href: `/p/${p.slug}` })),
  ];
}
