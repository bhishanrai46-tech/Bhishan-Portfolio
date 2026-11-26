"use client";

import { templates } from "@/content/templates";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

export function Education() {
  const { content, editing } = useContent();
  const items = content.education;
  return (
    <Section id="education" tone="paper2">
      <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
        {items.map((e, i) => (
          <Reveal key={i} delay={i * 0.1} className="bg-paper-2">
            <article className="relative h-full p-8 md:p-10">
              <ItemControls path="education" index={i} count={items.length} className="right-3 top-3" />
              <p className="eyebrow text-bronze-deep">
                <T path={`education.${i}.period`} placeholder="Dates" />
              </p>
              <h3 className="display mt-3 text-4xl">
                <T path={`education.${i}.degree`} placeholder="Qualification" />
              </h3>
              <p className="mt-3 text-lg">
                <T path={`education.${i}.school`} placeholder="Institution" />
              </p>
              <p className="text-sm text-muted">
                <T path={`education.${i}.place`} placeholder="Location" />
              </p>

              {(e.courses.length > 0 || editing) && (
                <>
                  <h4 className="eyebrow mt-8 text-muted">
                    <T path="labels.coursework" />
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.courses.map((_c, j) => (
                      <li key={j} className="relative border border-line px-3 py-1.5 text-sm">
                        <T path={`education.${i}.courses.${j}`} placeholder="Subject" />
                        <ItemControls path={`education.${i}.courses`} index={j} count={e.courses.length} className="-right-1 -top-4 scale-75" />
                      </li>
                    ))}
                  </ul>
                  <AddItem path={`education.${i}.courses`} item={templates.tag} label="Add subject" className="mt-3" />
                </>
              )}

              {(e.achievements.some((a) => !a.placeholder) || editing) && (
                <>
                  <h4 className="eyebrow mt-8 text-muted">
                    <T path="labels.achievements" />
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    {e.achievements.map((a, j) =>
                      a.placeholder && !editing ? null : (
                        <li key={j} className={`relative ${a.placeholder ? "border border-dashed border-line px-3 py-2 italic text-muted" : ""}`}>
                          <T path={`education.${i}.achievements.${j}.text`} placeholder="Achievement" />
                          <ItemControls path={`education.${i}.achievements`} index={j} count={e.achievements.length} className="-top-3 right-0 scale-90" />
                        </li>
                      ),
                    )}
                  </ul>
                  <AddItem path={`education.${i}.achievements`} item={templates.achievementItem} label="Add achievement" className="mt-3" />
                </>
              )}
            </article>
          </Reveal>
        ))}
      </div>
      <AddItem path="education" item={templates.education} label="Add qualification" className="mt-6" />
    </Section>
  );
}
