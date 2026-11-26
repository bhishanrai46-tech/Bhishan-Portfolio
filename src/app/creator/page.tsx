import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { creatorEnabled, isCreator } from "@/lib/auth";

export const metadata: Metadata = { title: "Creator login", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CreatorPage() {
  const enabled = creatorEnabled();
  const already = enabled && (await isCreator());
  return (
    <main className="on-dark flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <div className="w-full max-w-md">
        <p className="eyebrow text-bronze">Creator mode</p>
        <h1 className="display mt-3 text-5xl">Log in to edit your site</h1>
        {!enabled ? (
          <div className="mt-8 border border-line-dark p-5 text-sm leading-relaxed text-muted-dark">
            <p className="text-paper">Creator mode isn't switched on yet.</p>
            <p className="mt-2">
              In Vercel, open your project, go to <b>Settings → Environment Variables</b>, add <code className="text-bronze">CREATOR_PASSWORD</code> with a long password you choose, then redeploy.
            </p>
          </div>
        ) : already ? (
          <p className="mt-8 text-muted-dark">
            You're already logged in.{" "}
            <Link href="/" className="text-bronze underline">
              Go to the site and start editing
            </Link>
            .
          </p>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
