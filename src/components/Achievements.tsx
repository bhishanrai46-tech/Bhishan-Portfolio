import { achievements } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Achievements() {
  return (
    <Section id="achievements" tone="paper2" eyebrow="09 — Achievements" title={<>Qualifications, training and milestones.</>}>
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {achievements.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 0.08}>
            <h3 className="display border-b border-line pb-3 text-3xl">{g.group}</h3>
            <ul className="mt-5 space-y-3">
              {g.items.map((it) => (
                <li
                  key={it.text}
                  className={
                    "placeholder" in it && it.placeholder
                      ? "border border-dashed border-line px-4 py-3 text-sm italic text-muted"
                      : "flex gap-3 text-muted"
                  }
                >
                  {!("placeholder" in it && it.placeholder) && <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bronze-deep" />}
                  {it.text}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
