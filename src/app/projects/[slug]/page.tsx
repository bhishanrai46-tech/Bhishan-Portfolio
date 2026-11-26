import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectDetail } from "@/components/details/ProjectDetail";
import { getContent } from "@/content/store";
import { isCreator } from "@/lib/auth";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getContent()).projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline, alternates: { canonical: `/projects/${p.slug}` }, robots: p.draft ? { index: false } : undefined };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [content, creator] = await Promise.all([getContent(), isCreator()]);
  const p = content.projects.find((x) => x.slug === slug);
  if (!p || (p.draft && !creator)) notFound();
  return (
    <>
      <Nav />
      <main>
        <ProjectDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
