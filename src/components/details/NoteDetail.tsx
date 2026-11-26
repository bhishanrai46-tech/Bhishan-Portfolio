"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Blocks } from "../Blocks";
import { T } from "../edit/T";
import { useContent } from "../edit/ContentProvider";
import { Loading } from "./Loading";

export function NoteDetail({ slug }: { slug: string }) {
  const { content } = useContent();
  const i = content.notes.findIndex((n) => n.slug === slug);
  if (i < 0) return <Loading />;
  const n = content.notes[i];
  const base = `notes.${i}`;
  return (
    <>
      <section className="on-dark bg-ink pb-16 pt-32 text-paper md:pt-40">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Link href="/#notes" className="inline-flex items-center gap-2 text-sm text-muted-dark hover:text-paper">
            <ArrowLeft size={16} aria-hidden /> {content.labels.allNotes}
          </Link>
          <p className="eyebrow mt-10 text-bronze">
            <T path={`${base}.category`} placeholder="Category" /> · <T path={`${base}.date`} placeholder="Date" /> · <T path={`${base}.readTime`} placeholder="Read time" />
            {n.draft && <span className="ml-3 border border-bronze px-2 py-0.5">Draft: hidden from visitors</span>}
          </p>
          <T path={`${base}.title`} as="h1" className="display mt-4 block text-5xl md:text-7xl" placeholder="Article title" />
        </div>
      </section>
      <article className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Blocks path={`${base}.blocks`} />
        </div>
      </article>
    </>
  );
}
