"use client";

import { templates } from "@/content/templates";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Achievements() {
  const { content, editing } = useContent();
  const groups = content.achievements;
  return (
    <Section id="achievements" tone="paper2">
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {groups.map((g, i) => {
          const visible = g.items.some((it) => !it.placeholder);
          if (!visible && !editing) return null; // nothing to show yet
          return (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div className="relative">
                <ItemControls path="achievements" index={i} count={groups.length} className="-top-1 right-0" />
                <h3 className="display border-b border-line pb-3 text-3xl">
                  <T path={`achievements.${i}.group`} placeholder="Group name" />
                </h3>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it, j) =>
                    it.placeholder && !editing ? null : (
                      <li key={j} className={`relative ${it.placeholder ? "border border-dashed border-line px-4 py-3 text-sm italic text-muted" : "flex gap-3 text-muted"}`}>
                        {!it.placeholder && <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-bronze-deep" />}
                        <T path={`achievements.${i}.items.${j}.text`} multiline placeholder="Achievement" />
                        <ItemControls path={`achievements.${i}.items`} index={j} count={g.items.length} className="-top-3 right-0 scale-90" />
                      </li>
                    ),
                  )}
                </ul>
                <AddItem path={`achievements.${i}.items`} item={templates.achievementItem} label="Add item" className="mt-4" />
              </div>
            </Reveal>
          );
        })}
      </div>
      <AddItem path="achievements" item={templates.achievementGroup} label="Add group" className="mt-8" />
    </Section>
  );
}
