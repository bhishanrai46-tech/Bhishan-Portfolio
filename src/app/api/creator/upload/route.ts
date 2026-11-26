import crypto from "node:crypto";
import { isCreator, json, sameOrigin } from "@/lib/auth";
import { saveUpload, StorageNotConfigured } from "@/content/store";

export const runtime = "nodejs";

const MAX = 4 * 1024 * 1024; // Vercel functions accept about 4.5 MB per request

type Kind = { ext: string; mime: string; group: "image" | "file" };

/** Decide the type from the file's first bytes, not from its name. */
function sniff(b: Buffer): Kind | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", mime: "image/jpeg", group: "image" };
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: "png", mime: "image/png", group: "image" };
  if (b.subarray(0, 4).toString() === "GIF8") return { ext: "gif", mime: "image/gif", group: "image" };
  if (b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP") return { ext: "webp", mime: "image/webp", group: "image" };
  if (b.subarray(4, 8).toString() === "ftyp" && b.subarray(8, 12).toString() === "avif") return { ext: "avif", mime: "image/avif", group: "image" };
  if (b.subarray(0, 4).toString() === "%PDF") return { ext: "pdf", mime: "application/pdf", group: "file" };
  if (b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04)
    return { ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", group: "file" };
  return null;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Not allowed." }, 403);
  if (!(await isCreator())) return json({ error: "Please log in again." }, 401);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Invalid upload." }, 400);
  }
  const file = form.get("file");
  const want = form.get("kind") === "file" ? "file" : "image";
  if (!(file instanceof File)) return json({ error: "No file received." }, 400);
  if (file.size > MAX) return json({ error: "That file is over 4 MB. Try a smaller one." }, 413);

  const bytes = Buffer.from(await file.arrayBuffer());
  const kind = sniff(bytes);
  if (!kind || kind.group !== want)
    return json({ error: want === "image" ? "Please choose a JPG, PNG, WebP, GIF or AVIF image." : "Please choose a PDF or Word (.docx) file." }, 415);

  const name = `${crypto.randomBytes(8).toString("hex")}.${kind.ext}`;
  try {
    const url = await saveUpload(bytes, name, kind.mime);
    return json({ ok: true, url });
  } catch (e) {
    if (e instanceof StorageNotConfigured) return json({ error: e.message }, 503);
    console.error("upload failed", e);
    return json({ error: "Upload failed. Please try again." }, 500);
  }
}
