import { ArrowDown, Download, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="home" className="on-dark relative flex min-h-screen items-center overflow-hidden bg-ink pb-20 pt-28 text-paper">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-bronze">
              <MapPin size={14} aria-hidden /> {site.location}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[clamp(1.1rem,2vw,1.35rem)] font-normal text-muted-dark">{site.name}</h1>
            <p className="display mt-3 text-[clamp(2.8rem,6.2vw,5.6rem)]">
              {site.headline.map((line, i) => (
                <span key={line} className={`block ${i === 2 ? "text-bronze" : ""}`}>
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="eyebrow mt-7 text-paper/80">{site.title}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-dark">{site.intro}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="bg-bronze px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper">
                Explore My Work
              </a>
              <a href="#about" className="border border-line-dark px-6 py-3.5 text-sm text-paper transition-colors hover:border-paper">
                About Me
              </a>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 border border-line-dark px-6 py-3.5 text-sm text-paper transition-colors hover:border-paper"
              >
                <Download size={15} aria-hidden /> Download CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <Media
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              label="Portrait photo"
              className="aspect-[4/5] w-full"
              sizes="(min-width:1024px) 40vw, 90vw"
              priority
            />
            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full border border-bronze" />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-dark transition-colors hover:text-paper md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
