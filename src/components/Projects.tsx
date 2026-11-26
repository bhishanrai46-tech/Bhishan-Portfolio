"use client";

import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { useContent } from "./edit/ContentProvider";

export function Projects() {
  const { content, editing, createEntry } = useContent();
  return (
    <Section id="projects">
      <div className="grid gap-6 lg:grid-cols-2">
        {content.projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
            <ProjectCard index={i} featured={i === 0} />
          </Reveal>
        ))}
      </div>
      {editing && (
        <button
          type="button"
          data-creator-ui
          onClick={() => createEntry("project")}
          className="mt-6 inline-flex items-center gap-2 border border-dashed border-ink/40 px-4 py-2.5 text-sm hover:border-bronze-deep hover:text-bronze-deep"
        >
          <Plus size={15} /> Add project (saves, then opens it)
        </button>
      )}
    </Section>
  );
}
