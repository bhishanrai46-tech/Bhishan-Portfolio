import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { notes } from "@/data/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

type Params = { slug: string };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) return {};
  return { title: n.title, description: n.excerpt, alternates: { canonical: `/notes/${n.slug}` } };
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="on-dark bg-ink pb-16 pt-32 text-paper md:pt-40">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <Link href="/#notes" className="inline-flex items-center gap-2 text-sm text-muted-dark hover:text-paper">
              <ArrowLeft size={16} aria-hidden /> All notes
            </Link>
            <p className="eyebrow mt-10 text-bronze">
              {n.category} · {n.date} · {n.readTime}
            </p>
            <h1 className="display mt-4 text-5xl md:text-7xl">{n.title}</h1>
          </div>
        </section>
        <article className="bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6 px-6 text-lg leading-relaxed md:px-10">
            {n.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
