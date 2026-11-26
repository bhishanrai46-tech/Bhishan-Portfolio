import { NextResponse } from "next/server";
import { checkPassword, creatorEnabled, json, sameOrigin, startSession } from "@/lib/auth";

export const runtime = "nodejs";

// Best-effort brake on guessing: 6 wrong tries per 10 minutes per address.
const fails = new Map<string, { n: number; until: number }>();

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Not allowed." }, 403);
  if (!creatorEnabled()) return json({ error: "Creator mode isn't set up yet. Add CREATOR_PASSWORD in your Vercel settings." }, 503);

  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const rec = fails.get(ip);
  if (rec && rec.n >= 6 && rec.until > Date.now()) return json({ error: "Too many attempts. Try again in a few minutes." }, 429);

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (!checkPassword(password)) {
    fails.set(ip, { n: (rec && rec.until > Date.now() ? rec.n : 0) + 1, until: Date.now() + 10 * 60 * 1000 });
    await new Promise((r) => setTimeout(r, 700));
    return json({ error: "Wrong password." }, 401);
  }

  fails.delete(ip);
  return startSession(NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } }));
}
