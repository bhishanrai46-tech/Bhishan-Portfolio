import { projects } from "@/data/site";
import { Media } from "./Media";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="05 — Selected work"
      title={<>Things I've designed, built and explored.</>}
      intro="Each project opens into a short case study. Open the quick details on any card, or view the full page."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
            <ProjectCard
              project={p}
              featured={i === 0}
              media={
                <Media
                  src={p.image}
                  alt={p.title}
                  label={`Project ${p.number} image`}
                  className={i === 0 ? "aspect-[21/9] w-full" : "aspect-[16/10] w-full"}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              }
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
