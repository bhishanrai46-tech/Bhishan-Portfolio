"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, useSectionMeta } from "./Section";
import { T } from "./edit/T";
import { ELink } from "./edit/ELink";
import { ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Notes() {
  const { content, editing, createEntry } = useContent();
  const { hidden } = useSectionMeta("notes");
  const notes = content.notes;
  // Nothing published yet: visitors don't need to see an empty section.
  if (hidden || (!editing && notes.length === 0)) return null;

  return (
    <Section id="notes">
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 3) * 0.08} className="bg-paper">
            <div className="group relative flex h-full min-h-[300px] flex-col justify-between p-7 transition-colors hover:bg-ink hover:text-paper">
              <ItemControls path="notes" index={i} count={notes.length} className="right-2 top-2" />
              <div>
                <div className="flex items-center justify-between gap-2">
                  <T path={`notes.${i}.category`} className="eyebrow text-bronze-deep group-hover:text-bronze" placeholder="Category" />
                  {n.draft && <span className="eyebrow border border-line px-2 py-0.5 text-muted group-hover:border-line-dark">Draft</span>}
                </div>
                <h3 className="display mt-6 text-3xl">
                  <ELink href={`/notes/${n.slug}`} className="after:absolute after:inset-0">
                    <T path={`notes.${i}.title`} placeholder="Title" />
                  </ELink>
                </h3>
                <T path={`notes.${i}.excerpt`} as="p" multiline className="mt-4 block text-muted group-hover:text-muted-dark" placeholder="Short summary" />
              </div>
              <div className="mt-8 flex items-center justify-between text-sm text-muted group-hover:text-muted-dark">
                <T path={`notes.${i}.readTime`} placeholder="2 min read" />
                <ArrowUpRight size={18} aria-hidden />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {editing && (
        <button type="button" data-creator-ui onClick={() => createEntry("note")} className="mt-6 inline-flex items-center gap-2 border border-dashed border-ink/40 px-4 py-2.5 text-sm hover:border-bronze-deep hover:text-bronze-deep">
          <Plus size={15} /> Add article (saves, then opens it)
        </button>
      )}
      {editing && (
        <p className="mt-3 text-xs text-muted" data-creator-ui>
          Articles marked Draft are hidden from visitors until you publish them in the Pages panel.
        </p>
      )}
    </Section>
  );
}
