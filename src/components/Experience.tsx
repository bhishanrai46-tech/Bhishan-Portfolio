"use client";

import { templates } from "@/content/templates";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Experience() {
  const { content } = useContent();
  const { current, previous } = content.experience;
  return (
    <Section id="experience">
      <Reveal>
        <article className="on-dark bg-ink p-8 text-paper md:p-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-bronze">
                <T path="labels.currentPosition" />
              </p>
              <h3 className="display mt-3 text-4xl md:text-6xl">
                <T path="experience.current.role" placeholder="Job title" />
              </h3>
              <p className="mt-3 text-lg text-muted-dark">
                <T path="experience.current.company" placeholder="Company" /> · <T path="experience.current.place" placeholder="Place" />
              </p>
            </div>
            <p className="eyebrow border border-bronze px-3 py-1.5 text-bronze">
              <T path="experience.current.period" placeholder="Dates" />
            </p>
          </div>
          <ul className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
            {current.points.map((_, i) => (
              <li key={i} className="relative flex gap-3 text-muted-dark">
                <ItemControls path="experience.current.points" index={i} count={current.points.length} className="-top-2 right-0" />
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bronze" />
                <T path={`experience.current.points.${i}`} multiline placeholder="Responsibility or achievement" />
              </li>
            ))}
          </ul>
          <AddItem path="experience.current.points" item={templates.point} label="Add point" light className="mt-6" />
        </article>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <p className="eyebrow text-bronze-deep">
            <T path="labels.careerProgression" />
          </p>
          <T path="experience.progression" as="p" multiline className="display mt-4 block max-w-3xl text-3xl md:text-4xl" placeholder="How your career has progressed" />
        </Reveal>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {previous.map((r, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-paper">
              <article className="relative h-full p-7">
                <ItemControls path="experience.previous" index={i} count={previous.length} className="right-2 top-2" />
                <p className="eyebrow text-bronze-deep">
                  <T path={`experience.previous.${i}.period`} placeholder="Dates" />
                </p>
                <h3 className="display mt-3 text-3xl">
                  <T path={`experience.previous.${i}.role`} placeholder="Role" />
                </h3>
                <p className="mt-1 text-sm text-muted">
                  <T path={`experience.previous.${i}.company`} placeholder="Company" />
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {r.points.map((_p, j) => (
                    <li key={j} className="relative flex gap-3">
                      <ItemControls path={`experience.previous.${i}.points`} index={j} count={r.points.length} className="-top-2 right-0 scale-90" />
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-bronze-deep" />
                      <T path={`experience.previous.${i}.points.${j}`} multiline placeholder="What you did" />
                    </li>
                  ))}
                </ul>
                <AddItem path={`experience.previous.${i}.points`} item={templates.point} label="Add point" className="mt-4" />
              </article>
            </Reveal>
          ))}
        </div>
        <AddItem path="experience.previous" item={templates.previousRole} label="Add role" className="mt-6" />
      </div>
    </Section>
  );
}
