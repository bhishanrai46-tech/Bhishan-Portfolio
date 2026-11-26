"use client";

import { Blocks } from "../Blocks";
import { T } from "../edit/T";
import { useContent } from "../edit/ContentProvider";
import { Loading } from "./Loading";

export function PageDetail({ slug }: { slug: string }) {
  const { content } = useContent();
  const i = content.pages.findIndex((p) => p.slug === slug);
  if (i < 0) return <Loading />;
  const p = content.pages[i];
  const base = `pages.${i}`;
  return (
    <>
      <section className="on-dark bg-ink pb-16 pt-32 text-paper md:pt-40">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          {p.draft && <p className="eyebrow mb-6 inline-block border border-bronze px-2 py-0.5 text-bronze">Draft: hidden from visitors</p>}
          <T path={`${base}.title`} as="h1" className="display block text-5xl md:text-7xl" placeholder="Page title" />
          <T path={`${base}.subtitle`} as="p" multiline className="mt-6 block text-xl text-muted-dark" placeholder="Short introduction (optional)" />
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
