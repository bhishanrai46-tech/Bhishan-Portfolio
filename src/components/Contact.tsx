"use client";

import { MapPin } from "lucide-react";
import { safeHref } from "@/lib/url";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { HiddenBadge, useSectionMeta } from "./Section";
import { Socials } from "./Socials";
import { T } from "./edit/T";
import { useContent } from "./edit/ContentProvider";

export function Contact() {
  const { content } = useContent();
  const { site } = content;
  const { base, hidden, off } = useSectionMeta("contact");
  if (hidden) return null;

  return (
    <section id="contact" className={`on-dark bg-ink py-24 text-paper md:py-32 ${off ? "opacity-60" : ""}`}>
      {off && <HiddenBadge />}
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-2">
        <Reveal>
          <T path={`${base}.eyebrow`} as="p" className="eyebrow block text-bronze" placeholder="Small label" />
          <h2 className="display mt-4 text-5xl md:text-7xl">
            <T path="contact.headlineA" placeholder="Headline" /> <T path="contact.headlineB" className="text-bronze" placeholder="Accent words" />
          </h2>
          <dl className="mt-12 space-y-6">
            <div>
              <dt className="eyebrow text-muted-dark">
                <T path="labels.email" />
              </dt>
              <dd className="mt-1 text-xl">
                <a href={`mailto:${site.email}`} className="underline decoration-bronze underline-offset-4 hover:text-bronze">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-dark">
                <T path="labels.elsewhere" />
              </dt>
              <dd className="mt-2 space-y-1 text-muted-dark">
                {site.linkedin && (
                  <p>
                    <a href={safeHref(site.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                      {site.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </p>
                )}
                {site.github && (
                  <p>
                    <a href={safeHref(site.github)} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                      {site.github.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </p>
                )}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-dark">
                <T path="labels.location" />
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-xl">
                <MapPin size={18} className="text-bronze" aria-hidden /> {site.location}
              </dd>
            </div>
          </dl>
          <div className="mt-10">
            <Socials />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
