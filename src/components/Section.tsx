import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  tone = "light",
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  tone?: "light" | "dark" | "paper2";
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "dark" ? "bg-ink text-paper on-dark" : tone === "paper2" ? "bg-paper-2 text-ink" : "bg-paper text-ink";
  const accent = tone === "dark" ? "text-bronze" : "text-bronze-deep";
  const muted = tone === "dark" ? "text-muted-dark" : "text-muted";

  return (
    <section id={id} className={`${bg} py-24 md:py-32`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className={`eyebrow ${accent}`}>{eyebrow}</p>
          <h2 className="display mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h2>
          {intro && <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${muted}`}>{intro}</p>}
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
