import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "bb_session"; // httpOnly, signed: the real login
export const HINT_COOKIE = "bb_creator"; // readable by the page so visitors never trigger extra requests
const WEEK = 60 * 60 * 24 * 7;

export const creatorEnabled = () => !!process.env.CREATOR_PASSWORD;

function secret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  const p = process.env.CREATOR_PASSWORD;
  return p ? crypto.createHash("sha256").update(`bb:${p}`).digest("hex") : null;
}

const sign = (payload: string, key: string) => crypto.createHmac("sha256", key).update(payload).digest("hex");

export function checkPassword(input: string): boolean {
  const real = process.env.CREATOR_PASSWORD;
  if (!real) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function isCreator(): Promise<boolean> {
  const key = secret();
  if (!key) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sign(exp, key));
  const given = Buffer.from(sig);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

export function startSession(res: NextResponse) {
  const key = secret();
  if (!key) return res;
  const exp = String(Date.now() + WEEK * 1000);
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(SESSION_COOKIE, `${exp}.${sign(exp, key)}`, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: WEEK });
  res.cookies.set(HINT_COOKIE, "1", { httpOnly: false, secure, sameSite: "lax", path: "/", maxAge: WEEK });
  return res;
}

export function endSession(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(HINT_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

/** Browsers send Origin on writes; reject requests that come from another site. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
