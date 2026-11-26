"use client";

import { templates } from "@/content/templates";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function About() {
  const { content } = useContent();
  const { about } = content;
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Media src={about.image} path="about.image" alt="Bhishan at work" label="About photo" className="aspect-[4/5] w-full" />
        </Reveal>
        <div>
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((_, i) => (
                <div key={i} className="relative">
                  <ItemControls path="about.paragraphs" index={i} count={about.paragraphs.length} className="-top-3 right-0" />
                  <T path={`about.paragraphs.${i}`} as="p" multiline placeholder="Write a paragraph" />
                </div>
              ))}
              <AddItem path="about.paragraphs" item={templates.paragraph} label="Add paragraph" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="eyebrow mt-14 text-bronze-deep">
              <T path="labels.howIApproach" />
            </h3>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {about.approach.map((_, i) => (
                <div key={i} className="relative grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <ItemControls path="about.approach" index={i} count={about.approach.length} className="right-0 top-1" />
                  <dt className="display text-2xl">
                    <T path={`about.approach.${i}.title`} placeholder="Title" />
                  </dt>
                  <dd className="text-muted">
                    <T path={`about.approach.${i}.text`} placeholder="Description" />
                  </dd>
                </div>
              ))}
            </dl>
            <AddItem path="about.approach" item={templates.approach} label="Add principle" className="mt-4" />
          </Reveal>

          <Reveal delay={0.15}>
            <T path="about.ambition" as="p" multiline className="display mt-14 block border-l-2 border-bronze pl-6 text-3xl md:text-4xl" placeholder="Your long-term ambition" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
