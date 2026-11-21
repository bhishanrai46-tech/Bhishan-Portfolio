import { about } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title={<>{about.lead}</>}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Media src={about.image} alt="Bhishan at work" label="About photo" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 90vw" />
        </Reveal>
        <div>
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="eyebrow mt-14 text-bronze-deep">How I approach problems</h3>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {about.approach.map((a) => (
                <div key={a.title} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="display text-2xl">{a.title}</dt>
                  <dd className="text-muted">{a.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="display mt-14 border-l-2 border-bronze pl-6 text-3xl md:text-4xl">{about.ambition}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
