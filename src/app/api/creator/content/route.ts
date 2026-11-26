import { revalidatePath } from "next/cache";
import { isCreator, json, sameOrigin } from "@/lib/auth";
import { sanitizeContent } from "@/content/sanitize";
import { getContent, saveContent, StorageNotConfigured } from "@/content/store";

export const runtime = "nodejs";

/** Full content, including drafts. Only for the logged-in creator. */
export async function GET() {
  if (!(await isCreator())) return json({ error: "Not logged in." }, 401);
  return json(await getContent());
}

export async function PUT(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Not allowed." }, 403);
  if (!(await isCreator())) return json({ error: "Please log in again." }, 401);

  const text = await req.text();
  if (text.length > 700_000) return json({ error: "That's too much content to save at once." }, 413);

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Invalid content." }, 400);
  }

  const content = sanitizeContent(raw);
  try {
    await saveContent(content);
  } catch (e) {
    if (e instanceof StorageNotConfigured) return json({ error: e.message }, 503);
    console.error("save failed", e);
    return json({ error: "Couldn't save. If this keeps happening, check the Blob store is Public and connected." }, 500);
  }

  revalidatePath("/", "layout"); // refresh the visitor pages
  return json({ ok: true, content });
}
