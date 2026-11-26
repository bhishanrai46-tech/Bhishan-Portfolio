"use client";

import { ArrowDown, Download, MapPin } from "lucide-react";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { T } from "./edit/T";
import { ELink } from "./edit/ELink";
import { useContent } from "./edit/ContentProvider";

export function Hero() {
  const { content } = useContent();
  const { site, labels } = content;
  return (
    <section id="home" className="on-dark relative flex min-h-screen items-center overflow-hidden bg-ink pb-20 pt-28 text-paper">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-bronze">
              <MapPin size={14} aria-hidden /> <T path="site.location" placeholder="Location" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[clamp(1.1rem,2vw,1.35rem)] font-normal text-muted-dark">
              <T path="site.name" placeholder="Your name" />
            </h1>
            <p className="display mt-3 text-[clamp(2.8rem,6.2vw,5.6rem)]">
              {site.headline.map((_, i) => (
                <T key={i} path={`site.headline.${i}`} className={`block ${i === 2 ? "text-bronze" : ""}`} placeholder="Headline line" />
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <T path="site.title" as="p" className="eyebrow mt-7 block text-paper/80" placeholder="Your title" />
            <T path="site.intro" as="p" multiline className="mt-5 block max-w-xl text-lg leading-relaxed text-muted-dark" placeholder="A short introduction" />
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ELink href="#projects" className="bg-bronze px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper">
                <T path="hero.primary" placeholder="Button" />
              </ELink>
              <ELink href="#about" className="border border-line-dark px-6 py-3.5 text-sm text-paper transition-colors hover:border-paper">
                <T path="hero.secondary" placeholder="Button" />
              </ELink>
              <ELink href={site.cv} download className="inline-flex items-center gap-2 border border-line-dark px-6 py-3.5 text-sm text-paper transition-colors hover:border-paper">
                <Download size={15} aria-hidden /> <T path="labels.downloadCv" placeholder="Button" />
              </ELink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <Media src={site.portrait} path="site.portrait" alt={`Portrait of ${site.name}`} label="Portrait photo" className="aspect-[4/5] w-full" priority />
            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full border border-bronze" />
          </div>
        </Reveal>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-dark transition-colors hover:text-paper md:flex">
        <span className="eyebrow">{labels.scroll}</span>
        <ArrowDown size={16} className="animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
