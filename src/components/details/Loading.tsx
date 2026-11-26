"use client";

import { useContent } from "../edit/ContentProvider";

/** Shown while the creator's full content (including drafts) loads. */
export function Loading() {
  const { creator, ready } = useContent();
  return (
    <section className="on-dark flex min-h-[60vh] items-center bg-ink pt-24 text-paper">
      <p className="mx-auto max-w-7xl px-6 text-muted-dark md:px-10">{creator && !ready ? "Loading…" : "Loading your page…"}</p>
    </section>
  );
}
