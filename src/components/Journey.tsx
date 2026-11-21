import { journey } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Journey() {
  return (
    <Section
      id="journey"
      tone="dark"
      eyebrow="02 — Journey"
      title={<>From Nepal to Sydney, from the shop floor to technical services.</>}
      intro="The milestones that shaped how I think and work."
    >
      <ol className="relative">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-dark md:left-1/2" />
        {journey.map((j, i) => {
          const right = i % 2 === 1;
          return (
            <li key={j.title} className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-bronze bg-ink md:left-1/2 md:-translate-x-1/2"
              />
              <Reveal className={right ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
                <p className="eyebrow text-bronze">{j.date}</p>
                <h3 className="display mt-2 text-3xl md:text-4xl">{j.title}</h3>
                <p className="mt-3 text-muted-dark">{j.text}</p>
                {j.image && (
                  <Media src={j.image} alt={j.title} label={j.title} className="mt-5 aspect-[16/10] w-full" sizes="(min-width:768px) 40vw, 90vw" />
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
