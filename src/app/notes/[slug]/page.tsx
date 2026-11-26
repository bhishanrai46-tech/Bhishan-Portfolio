import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NoteDetail } from "@/components/details/NoteDetail";
import { getContent } from "@/content/store";
import { isCreator } from "@/lib/auth";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const n = (await getContent()).notes.find((x) => x.slug === slug);
  if (!n) return {};
  return { title: n.title, description: n.excerpt, alternates: { canonical: `/notes/${n.slug}` }, robots: n.draft ? { index: false } : undefined };
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [content, creator] = await Promise.all([getContent(), isCreator()]);
  const n = content.notes.find((x) => x.slug === slug);
  if (!n || (n.draft && !creator)) notFound();
  return (
    <>
      <Nav />
      <main>
        <NoteDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
