import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { Media } from "@/components/Media";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline, alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main>
        <section className="on-dark bg-ink pb-16 pt-32 text-paper md:pt-40">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-dark hover:text-paper">
              <ArrowLeft size={16} aria-hidden /> All projects
            </Link>
            <p className="eyebrow mt-10 text-bronze">
              Project {p.number} · {p.status}
            </p>
            <h1 className="display mt-4 max-w-5xl text-5xl md:text-8xl">{p.title}</h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-dark">{p.tagline}</p>
          </div>
        </section>

        <div className="mx-auto -mt-px max-w-7xl px-6 md:px-10">
          <Media src={p.image} alt={p.title} label={`Project ${p.number} image`} className="aspect-[21/9] w-full" sizes="100vw" priority />
        </div>

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[1fr_2fr]">
            <aside className="space-y-10">
              <div>
                <h2 className="eyebrow text-bronze-deep">Technologies & tools</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <li key={t} className="border border-line px-3 py-1.5 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow text-bronze-deep">Links</h2>
                <ul className="mt-4 space-y-2">
                  {p.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 ${l.placeholder ? "italic text-muted" : "text-ink underline underline-offset-4"}`}
                      >
                        {l.label} <ArrowUpRight size={15} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-14">
              <Block label="Overview" text={p.overview} />
              <Block label="Problem" text={p.problem} />
              <Block label="My approach" text={p.approach} />
              <div>
                <h2 className="eyebrow text-bronze-deep">Results & impact</h2>
                <ul className="mt-4 space-y-3 text-lg">
                  {p.results.map((r) => (
                    <li key={r.text} className={r.placeholder ? "border border-dashed border-line px-4 py-3 italic text-muted" : "border-l-2 border-bronze pl-4"}>
                      {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="on-dark bg-ink py-16 text-paper">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="eyebrow text-bronze">Next project</p>
            <Link href={`/projects/${next.slug}`} className="display mt-4 inline-flex items-center gap-4 text-4xl hover:text-bronze md:text-6xl">
              {next.title} <ArrowUpRight aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h2 className="eyebrow text-bronze-deep">{label}</h2>
      <p className="mt-4 text-xl leading-relaxed">{text}</p>
    </div>
  );
}
