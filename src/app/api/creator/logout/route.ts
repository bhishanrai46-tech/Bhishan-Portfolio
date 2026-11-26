import { NextResponse } from "next/server";
import { endSession, sameOrigin, json } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Not allowed." }, 403);
  return endSession(NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } }));
}
