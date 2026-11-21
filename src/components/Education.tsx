import { education } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" tone="paper2" eyebrow="04 — Education" title={<>Two engineering degrees, two countries.</>}>
      <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1} className="bg-paper-2">
            <article className="h-full p-8 md:p-10">
              <p className="eyebrow text-bronze-deep">{e.period}</p>
              <h3 className="display mt-3 text-4xl">{e.degree}</h3>
              <p className="mt-3 text-lg">{e.school}</p>
              <p className="text-sm text-muted">{e.place}</p>

              {e.courses.length > 0 && (
                <>
                  <h4 className="eyebrow mt-8 text-muted">Relevant coursework</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.courses.map((c) => (
                      <li key={c} className="border border-line px-3 py-1.5 text-sm">
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="eyebrow mt-8 text-muted">Achievements</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {e.achievements.map((a) => (
                  <li
                    key={a.text}
                    className={a.placeholder ? "border border-dashed border-line px-3 py-2 italic text-muted" : ""}
                  >
                    {a.text}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
