import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageDetail } from "@/components/details/PageDetail";
import { getContent } from "@/content/store";
import { isCreator } from "@/lib/auth";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getContent()).pages.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.subtitle, alternates: { canonical: `/p/${p.slug}` }, robots: p.draft ? { index: false } : undefined };
}

export default async function CustomPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [content, creator] = await Promise.all([getContent(), isCreator()]);
  const p = content.pages.find((x) => x.slug === slug);
  if (!p || (p.draft && !creator)) notFound();
  return (
    <>
      <Nav />
      <main>
        <PageDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
