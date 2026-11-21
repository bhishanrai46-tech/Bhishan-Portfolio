import { skills } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" tone="dark" eyebrow="06 — Capabilities" title={<>What I bring to a project.</>}>
      <div className="grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 0.08} className="bg-ink">
            <div className="h-full p-8 md:p-10">
              <p className="eyebrow text-bronze">0{i + 1}</p>
              <h3 className="display mt-3 text-3xl md:text-4xl">{g.group}</h3>
              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {g.items.map((s) => (
                  <li key={s} className="flex items-center gap-3 border-b border-line-dark pb-3 text-muted-dark">
                    <span aria-hidden className="h-1 w-1 shrink-0 bg-bronze" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
