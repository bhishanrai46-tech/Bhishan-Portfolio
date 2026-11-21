import { beyond } from "@/data/site";
import { Reveal } from "./Reveal";

export function Beyond() {
  return (
    <section id="beyond" className="on-dark bg-ink py-28 text-paper md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-bronze">08 — Beyond engineering</p>
          <blockquote className="display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7rem)]">
            {beyond.statement.split(". ").map((s, i, arr) => (
              <span key={s} className={`block ${i === arr.length - 1 ? "text-bronze" : ""}`}>
                {s}
                {i < arr.length - 1 ? "." : ""}
              </span>
            ))}
          </blockquote>
        </Reveal>

        <div className="mt-20 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-5">
          {beyond.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="bg-ink">
              <div className="h-full p-6">
                <p className="eyebrow text-bronze">0{i + 1}</p>
                <h3 className="display mt-3 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-dark">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
