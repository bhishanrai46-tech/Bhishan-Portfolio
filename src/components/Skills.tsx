"use client";

import { templates } from "@/content/templates";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Skills() {
  const { content } = useContent();
  const groups = content.skills;
  return (
    <Section id="skills" tone="dark">
      <div className="grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={i} delay={(i % 2) * 0.08} className="bg-ink">
            <div className="relative h-full p-8 md:p-10">
              <ItemControls path="skills" index={i} count={groups.length} className="right-3 top-3" />
              <p className="eyebrow text-bronze">0{i + 1}</p>
              <h3 className="display mt-3 text-3xl md:text-4xl">
                <T path={`skills.${i}.group`} placeholder="Category" />
              </h3>
              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {g.items.map((_s, j) => (
                  <li key={j} className="relative flex items-center gap-3 border-b border-line-dark pb-3 text-muted-dark">
                    <span aria-hidden className="h-1 w-1 shrink-0 bg-bronze" />
                    <T path={`skills.${i}.items.${j}`} placeholder="Skill" />
                    <ItemControls path={`skills.${i}.items`} index={j} count={g.items.length} className="-top-2 right-0 scale-75" />
                  </li>
                ))}
              </ul>
              <AddItem path={`skills.${i}.items`} item={templates.tag} label="Add skill" light className="mt-5" />
            </div>
          </Reveal>
        ))}
      </div>
      <AddItem path="skills" item={templates.skillGroup} label="Add category" className="mt-6" />
    </Section>
  );
}
