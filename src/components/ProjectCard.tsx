"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Project } from "@/data/site";

export function ProjectCard({ project, media, featured }: { project: Project; media: ReactNode; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={`group on-dark flex flex-col bg-ink text-paper ${featured ? "lg:col-span-2" : ""}`}>
      <Link href={`/projects/${project.slug}`} className="relative block overflow-hidden" aria-label={`Open case study: ${project.title}`}>
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">{media}</div>
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-bronze">Project {project.number}</span>
          <span className="eyebrow text-muted-dark">{project.status}</span>
        </div>
        <h3 className="display mt-4 text-3xl md:text-4xl">
          <Link href={`/projects/${project.slug}`} className="hover:text-bronze">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-muted-dark">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <li key={t} className="border border-line-dark px-2.5 py-1 text-xs text-muted-dark">
              {t}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 inline-flex items-center gap-2 self-start text-sm text-paper hover:text-bronze"
        >
          {open ? <Minus size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
          {open ? "Hide details" : "Quick details"}
        </button>

        <div id={panelId} hidden={!open} className="mt-5 space-y-5 border-t border-line-dark pt-5 text-sm leading-relaxed">
          <Detail label="Problem" text={project.problem} />
          <Detail label="Approach" text={project.approach} />
          <div>
            <h4 className="eyebrow text-bronze">Results</h4>
            <ul className="mt-2 space-y-2">
              {project.results.map((r) => (
                <li key={r.text} className={r.placeholder ? "border border-dashed border-line-dark px-3 py-2 italic text-muted-dark" : "text-muted-dark"}>
                  {r.text}
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-bronze hover:text-paper">
            Full case study <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="eyebrow text-bronze">{label}</h4>
      <p className="mt-2 text-muted-dark">{text}</p>
    </div>
  );
}
