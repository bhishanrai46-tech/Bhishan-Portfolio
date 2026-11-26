"use client";

import { templates } from "@/content/templates";
import { Reveal } from "./Reveal";
import { HiddenBadge, useSectionMeta } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Beyond() {
  const { content, editing } = useContent();
  const { meta, base, hidden, off } = useSectionMeta("beyond");
  if (hidden) return null;
  const sentences = meta.title.split(/(?<=\.)\s+/).filter(Boolean);
  const principles = content.beyond.principles;

  return (
    <section id="beyond" className={`on-dark bg-ink py-28 text-paper md:py-40 ${off ? "opacity-60" : ""}`}>
      {off && <HiddenBadge />}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <T path={`${base}.eyebrow`} as="p" className="eyebrow block text-bronze" placeholder="Small label" />
          {editing ? (
            <T path={`${base}.title`} as="blockquote" multiline className="display mt-8 block max-w-5xl text-[clamp(2.8rem,8vw,7rem)]" placeholder="Your personal statement" />
          ) : (
            <blockquote className="display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7rem)]">
              {sentences.map((s, i) => (
                <span key={i} className={`block ${i === sentences.length - 1 && sentences.length > 1 ? "text-bronze" : ""}`}>
                  {s}
                </span>
              ))}
            </blockquote>
          )}
        </Reveal>

        <div className="mt-20 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((_p, i) => (
            <Reveal key={i} delay={i * 0.06} className="bg-ink">
              <div className="relative h-full p-6">
                <ItemControls path="beyond.principles" index={i} count={principles.length} className="right-2 top-2 scale-90" />
                <p className="eyebrow text-bronze">0{i + 1}</p>
                <h3 className="display mt-3 text-2xl">
                  <T path={`beyond.principles.${i}.title`} placeholder="Principle" />
                </h3>
                <p className="mt-3 text-sm text-muted-dark">
                  <T path={`beyond.principles.${i}.text`} multiline placeholder="Describe it" />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <AddItem path="beyond.principles" item={templates.principle} label="Add principle" light className="mt-6" />
      </div>
    </section>
  );
}
