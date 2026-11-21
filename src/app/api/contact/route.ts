import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { name?: unknown; email?: unknown; message?: unknown; website?: unknown };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill this in. Pretend success.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  if (!name || name.length > 120) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 10 || message.length > 4000)
    return NextResponse.json({ error: "Please write a message of at least 10 characters." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json({ error: "The contact form isn't set up yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "Couldn't send your message right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
