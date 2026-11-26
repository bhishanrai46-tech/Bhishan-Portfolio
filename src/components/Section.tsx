"use client";

import type { ReactNode } from "react";
import type { SectionId } from "@/content/types";
import { Reveal } from "./Reveal";
import { T } from "./edit/T";
import { useContent } from "./edit/ContentProvider";

export function useSectionMeta(id: SectionId) {
  const { content, editing } = useContent();
  const idx = content.sections.findIndex((s) => s.id === id);
  const meta = content.sections[idx];
  return { idx, meta, base: `sections.${idx}`, hidden: !meta || (!meta.visible && !editing), off: !!meta && !meta.visible };
}

export function HiddenBadge() {
  return (
    <p className="mx-auto max-w-7xl px-6 pb-4 text-xs text-[#c8956a] md:px-10" data-creator-ui>
      This section is hidden from visitors. Use the Sections panel to show it.
    </p>
  );
}

export function Section({ id, tone = "light", children }: { id: SectionId; tone?: "light" | "dark" | "paper2"; children: ReactNode }) {
  const { base, hidden, off } = useSectionMeta(id);
  if (hidden) return null;

  const bg = tone === "dark" ? "bg-ink text-paper on-dark" : tone === "paper2" ? "bg-paper-2 text-ink" : "bg-paper text-ink";
  const accent = tone === "dark" ? "text-bronze" : "text-bronze-deep";
  const muted = tone === "dark" ? "text-muted-dark" : "text-muted";

  return (
    <section id={id} className={`${bg} py-24 md:py-32 ${off ? "opacity-60" : ""}`}>
      {off && <HiddenBadge />}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <T path={`${base}.eyebrow`} as="p" className={`eyebrow ${accent}`} placeholder="Small label" />
          <T path={`${base}.title`} as="h2" className="display mt-4 block max-w-4xl text-5xl md:text-7xl" placeholder="Section title" />
          <T path={`${base}.intro`} as="p" multiline className={`mt-6 block max-w-2xl text-lg leading-relaxed ${muted}`} placeholder="Add a short intro (optional)" />
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
