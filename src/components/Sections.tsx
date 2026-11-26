"use client";

import { createElement, Fragment, type ComponentType } from "react";
import type { SectionId } from "@/content/types";
import { About } from "./About";
import { Achievements } from "./Achievements";
import { Beyond } from "./Beyond";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Interests } from "./Interests";
import { Journey } from "./Journey";
import { Notes } from "./Notes";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { useContent } from "./edit/ContentProvider";

const registry: Record<SectionId, ComponentType> = {
  about: About,
  journey: Journey,
  experience: Experience,
  education: Education,
  projects: Projects,
  skills: Skills,
  interests: Interests,
  beyond: Beyond,
  achievements: Achievements,
  notes: Notes,
  contact: Contact,
};

/** Renders the home page sections in the order set in the Sections panel. */
export function Sections() {
  const { content } = useContent();
  return (
    <>
      {content.sections.map((s) => (
        <Fragment key={s.id}>{createElement(registry[s.id])}</Fragment>
      ))}
    </>
  );
}
