"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Media } from "./Media";
import { T } from "./edit/T";
import { ELink } from "./edit/ELink";
import { ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function ProjectCard({ index, featured }: { index: number; featured?: boolean }) {
  const { content, editing } = useContent();
  const p = content.projects[index];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  if (!p) return null;
  const href = `/projects/${p.slug}`;
  const shown = p.results.filter((r) => editing || !r.placeholder);

  return (
    <article className="group on-dark relative flex h-full flex-col bg-ink text-paper">
      <ItemControls path="projects" index={index} count={content.projects.length} className="right-3 top-12" />
      <ELink href={href} ariaLabel={`Open case study: ${p.title}`} className="relative block overflow-hidden">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Media src={p.image} path={`projects.${index}.image`} alt={p.title} label={`Project ${p.number} image`} className={featured ? "aspect-[21/9] w-full" : "aspect-[16/10] w-full"} />
        </div>
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </ELink>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-bronze">
            <T path="labels.projectLabel" /> <T path={`projects.${index}.number`} placeholder="01" />
            {p.draft && <span className="ml-2 border border-bronze px-1.5 py-0.5 text-[0.6rem]">Draft</span>}
          </span>
          <T path={`projects.${index}.status`} className="eyebrow text-muted-dark" placeholder="Status" />
        </div>
        <h3 className="display mt-4 text-3xl md:text-4xl">
          <ELink href={href} className="hover:text-bronze">
            <T path={`projects.${index}.title`} placeholder="Project title" />
          </ELink>
        </h3>
        <T path={`projects.${index}.tagline`} as="p" multiline className="mt-3 block text-muted-dark" placeholder="One-line summary" />

        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tools.map((_t, j) => (
            <li key={j} className="border border-line-dark px-2.5 py-1 text-xs text-muted-dark">
              <T path={`projects.${index}.tools.${j}`} placeholder="Tool" />
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={panelId} className="mt-6 inline-flex items-center gap-2 self-start text-sm text-paper hover:text-bronze">
          {open ? <Minus size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
          {open ? content.labels.hideDetails : content.labels.quickDetails}
        </button>

        <div id={panelId} hidden={!open} className="mt-5 space-y-5 border-t border-line-dark pt-5 text-sm leading-relaxed">
          <div>
            <h4 className="eyebrow text-bronze">{content.labels.problem}</h4>
            <T path={`projects.${index}.problem`} as="p" multiline className="mt-2 block text-muted-dark" placeholder="The problem" />
          </div>
          <div>
            <h4 className="eyebrow text-bronze">{content.labels.approach}</h4>
            <T path={`projects.${index}.approach`} as="p" multiline className="mt-2 block text-muted-dark" placeholder="Your approach" />
          </div>
          {shown.length > 0 && (
            <div>
              <h4 className="eyebrow text-bronze">{content.labels.results}</h4>
              <ul className="mt-2 space-y-2 text-muted-dark">
                {p.results.map((r, j) =>
                  r.placeholder && !editing ? null : (
                    <li key={j} className={r.placeholder ? "border border-dashed border-line-dark px-3 py-2 italic" : ""}>
                      <T path={`projects.${index}.results.${j}.text`} placeholder="Result" />
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
          <ELink href={href} className="inline-flex items-center gap-1.5 text-bronze hover:text-paper">
            {content.labels.fullCaseStudy} <ArrowUpRight size={15} aria-hidden />
          </ELink>
        </div>
      </div>
    </article>
  );
}
