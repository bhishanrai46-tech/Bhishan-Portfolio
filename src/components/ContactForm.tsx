"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full border border-line-dark bg-ink-2 px-4 py-3 text-paper placeholder:text-muted-dark focus:border-bronze focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setState("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="border border-bronze p-8">
        <p className="display text-3xl">Thanks, your message is on its way.</p>
        <p className="mt-3 text-muted-dark">I'll get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input name="name" required maxLength={120} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="block text-sm">
        Message
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} className={field} placeholder="Tell me about your idea or question" />
      </label>
      {/* Honeypot: real people never see or fill this */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-bronze px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm text-paper">
            {error} You can also email me at{" "}
            <a className="text-bronze underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
