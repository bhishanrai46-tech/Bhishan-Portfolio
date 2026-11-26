"use client";

import { templates } from "@/content/templates";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Journey() {
  const { content, editing } = useContent();
  const items = content.journey;
  return (
    <Section id="journey" tone="dark">
      <ol className="relative">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-dark md:left-1/2" />
        {items.map((j, i) => {
          const right = i % 2 === 1;
          return (
            <li key={i} className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              <span aria-hidden className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-bronze bg-ink md:left-1/2 md:-translate-x-1/2" />
              <Reveal className={`relative ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                <ItemControls path="journey" index={i} count={items.length} className="right-0 top-0" />
                <T path={`journey.${i}.date`} as="p" className="eyebrow block text-bronze" placeholder="Date" />
                <T path={`journey.${i}.title`} as="h3" className="display mt-2 block text-3xl md:text-4xl" placeholder="Title" />
                <T path={`journey.${i}.text`} as="p" multiline className="mt-3 block text-muted-dark" placeholder="Description" />
                {(j.image || editing) && (
                  <Media src={j.image} path={`journey.${i}.image`} alt={j.title} label="Milestone photo (optional)" className="mt-5 aspect-[16/10] w-full" />
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
      <AddItem path="journey" item={templates.journey} label="Add milestone" light className="mt-10" />
    </Section>
  );
}
