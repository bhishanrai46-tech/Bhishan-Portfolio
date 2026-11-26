import { readLocalUpload } from "@/content/store";

/** Serves uploads when running on your own computer. On Vercel, files are served from Blob storage instead. */
const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const m = /^[a-f0-9]{16}\.(jpg|png|gif|webp|avif|pdf|docx)$/.exec(name);
  if (!m) return new Response("Not found", { status: 404 });
  const bytes = await readLocalUpload(name);
  if (!bytes) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(bytes), {
    headers: { "Content-Type": TYPES[m[1]], "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" },
  });
}
