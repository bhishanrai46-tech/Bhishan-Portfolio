import { experience } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  const c = experience.current;
  return (
    <Section id="experience" eyebrow="03 — Experience" title={<>Where I work and what I do.</>}>
      <Reveal>
        <article className="on-dark bg-ink p-8 text-paper md:p-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-bronze">Current position</p>
              <h3 className="display mt-3 text-4xl md:text-6xl">{c.role}</h3>
              <p className="mt-3 text-lg text-muted-dark">
                {c.company} · {c.place}
              </p>
            </div>
            <p className="eyebrow border border-bronze px-3 py-1.5 text-bronze">{c.period}</p>
          </div>
          <ul className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
            {c.points.map((p) => (
              <li key={p} className="flex gap-3 text-muted-dark">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bronze" />
                {p}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <p className="eyebrow text-bronze-deep">Career progression</p>
          <p className="display mt-4 max-w-3xl text-3xl md:text-4xl">{experience.progression}</p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {experience.previous.map((r, i) => (
            <Reveal key={r.role} delay={i * 0.08} className="bg-paper">
              <article className="h-full p-7">
                <p className="eyebrow text-bronze-deep">{r.period}</p>
                <h3 className="display mt-3 text-3xl">{r.role}</h3>
                <p className="mt-1 text-sm text-muted">{r.company}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-bronze-deep" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
