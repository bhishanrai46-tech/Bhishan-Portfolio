import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Notes() {
  return (
    <Section
      id="notes"
      eyebrow="10 — Writing"
      title={<>Thoughts, Ideas & Explorations.</>}
      intro="Notes on engineering, passive fire protection, technology, business and lessons learned along the way."
    >
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={i * 0.08} className="bg-paper">
            <Link href={`/notes/${n.slug}`} className="group flex h-full min-h-[300px] flex-col justify-between p-7 transition-colors hover:bg-ink hover:text-paper">
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-bronze-deep group-hover:text-bronze">{n.category}</span>
                  {n.draft && <span className="eyebrow border border-line px-2 py-0.5 text-muted group-hover:border-line-dark">Draft</span>}
                </div>
                <h3 className="display mt-6 text-3xl">{n.title}</h3>
                <p className="mt-4 text-muted group-hover:text-muted-dark">{n.excerpt}</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm text-muted group-hover:text-muted-dark">
                <span>{n.readTime}</span>
                <ArrowUpRight size={18} aria-hidden />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
