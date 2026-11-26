"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { templates } from "@/content/templates";
import { safeHref } from "@/lib/url";
import { Media } from "../Media";
import { T } from "../edit/T";
import { AddItem, ItemControls } from "../edit/ItemControls";
import { useContent } from "../edit/ContentProvider";
import { Loading } from "./Loading";

export function ProjectDetail({ slug }: { slug: string }) {
  const { content, editing } = useContent();
  const i = content.projects.findIndex((p) => p.slug === slug);
  if (i < 0) return <Loading />;
  const p = content.projects[i];
  const { labels } = content;
  const pool = content.projects.filter((x) => editing || !x.draft);
  const next = pool[(pool.findIndex((x) => x.slug === slug) + 1) % pool.length] ?? p;
  const base = `projects.${i}`;

  return (
    <>
      <section className="on-dark bg-ink pb-16 pt-32 text-paper md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-dark hover:text-paper">
            <ArrowLeft size={16} aria-hidden /> {labels.allProjects}
          </Link>
          <p className="eyebrow mt-10 text-bronze">
            <T path="labels.projectLabel" /> <T path={`${base}.number`} placeholder="01" /> · <T path={`${base}.status`} placeholder="Status" />
            {p.draft && <span className="ml-3 border border-bronze px-2 py-0.5">Draft: hidden from visitors</span>}
          </p>
          <T path={`${base}.title`} as="h1" className="display mt-4 block max-w-5xl text-5xl md:text-8xl" placeholder="Project title" />
          <T path={`${base}.tagline`} as="p" multiline className="mt-6 block max-w-2xl text-xl text-muted-dark" placeholder="One-line summary" />
        </div>
      </section>

      <div className="mx-auto -mt-px max-w-7xl px-6 md:px-10">
        <Media src={p.image} path={`${base}.image`} alt={p.title} label={`Project ${p.number} image`} className="aspect-[21/9] w-full" priority />
      </div>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-10">
            <div>
              <h2 className="eyebrow text-bronze-deep">
                <T path="labels.technologies" />
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tools.map((_t, j) => (
                  <li key={j} className="relative border border-line px-3 py-1.5 text-sm">
                    <T path={`${base}.tools.${j}`} placeholder="Tool" />
                    <ItemControls path={`${base}.tools`} index={j} count={p.tools.length} className="-right-1 -top-4 scale-75" />
                  </li>
                ))}
              </ul>
              <AddItem path={`${base}.tools`} item={templates.tag} label="Add tool" className="mt-3" />
            </div>
            <div>
              <h2 className="eyebrow text-bronze-deep">
                <T path="labels.links" />
              </h2>
              <ul className="mt-4 space-y-3">
                {p.links.map((l, j) =>
                  l.placeholder && !editing ? null : (
                    <li key={j} className="relative">
                      <a href={safeHref(l.href)} target="_blank" rel="noopener noreferrer" onClick={(e) => editing && e.preventDefault()} className={`inline-flex items-center gap-1.5 ${l.placeholder ? "italic text-muted" : "underline underline-offset-4"}`}>
                        <T path={`${base}.links.${j}.label`} placeholder="Link text" /> <ArrowUpRight size={15} aria-hidden />
                      </a>
                      {editing && <LinkUrl path={`${base}.links.${j}.href`} />}
                      <ItemControls path={`${base}.links`} index={j} count={p.links.length} className="-top-3 right-0 scale-75" />
                    </li>
                  ),
                )}
              </ul>
              <AddItem path={`${base}.links`} item={templates.link} label="Add link" className="mt-3" />
            </div>
          </aside>

          <div className="space-y-14">
            {(["overview", "problem", "approach"] as const).map((k) => (
              <div key={k}>
                <h2 className="eyebrow text-bronze-deep">
                  <T path={`labels.${k}`} />
                </h2>
                <T path={`${base}.${k}`} as="p" multiline className="mt-4 block text-xl leading-relaxed" placeholder="Write here" />
              </div>
            ))}
            {(p.results.some((r) => !r.placeholder) || editing) && (
              <div>
                <h2 className="eyebrow text-bronze-deep">
                  <T path="labels.results" />
                </h2>
                <ul className="mt-4 space-y-3 text-lg">
                  {p.results.map((r, j) =>
                    r.placeholder && !editing ? null : (
                      <li key={j} className={`relative ${r.placeholder ? "border border-dashed border-line px-4 py-3 italic text-muted" : "border-l-2 border-bronze pl-4"}`}>
                        <T path={`${base}.results.${j}.text`} multiline placeholder="A measurable result" />
                        <ItemControls path={`${base}.results`} index={j} count={p.results.length} className="-top-3 right-0 scale-90" />
                      </li>
                    ),
                  )}
                </ul>
                <AddItem path={`${base}.results`} item={templates.achievementItem} label="Add result" className="mt-3" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-16 text-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="eyebrow text-bronze">{labels.nextProject}</p>
          <Link href={`/projects/${next.slug}`} className="display mt-4 inline-flex items-center gap-4 text-4xl hover:text-bronze md:text-6xl">
            {next.title} <ArrowUpRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}

function LinkUrl({ path }: { path: string }) {
  const { get, set } = useContent();
  return (
    <input
      data-creator-ui
      value={get<string>(path) ?? ""}
      onChange={(e) => set(path, e.target.value)}
      placeholder="https://…"
      aria-label="Link address"
      className="mt-1 block w-full border border-line bg-white px-2 py-1 text-xs"
    />
  );
}
