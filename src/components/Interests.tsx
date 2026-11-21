import { interests } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Interests() {
  return (
    <Section
      id="interests"
      eyebrow="07 — Interests"
      title={<>Beyond the workbench.</>}
      intro="Engineering is a big part of who I am, but not all of it. These are the things that keep me curious and balanced."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {interests.map((it, i) => {
          const tall = i === 0 || i === 5;
          return (
            <Reveal key={it.title} delay={(i % 3) * 0.07} className={tall ? "lg:row-span-2" : ""}>
              <figure className="on-dark group relative h-full min-h-[260px] overflow-hidden bg-ink text-paper">
                <Media
                  src={it.image}
                  alt={it.title}
                  label=""
                  className={`w-full transition-transform duration-700 group-hover:scale-[1.03] ${tall ? "h-full min-h-[540px]" : "h-full min-h-[260px]"}`}
                  sizes="(min-width:1024px) 33vw, 50vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-6 pt-16">
                  <p className="eyebrow text-bronze">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-1 text-2xl md:text-3xl">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-dark">{it.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
