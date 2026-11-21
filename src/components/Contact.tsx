import { MapPin } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Socials } from "./Socials";

export function Contact() {
  return (
    <section id="contact" className="on-dark bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-bronze">11 — Contact</p>
          <h2 className="display mt-4 text-5xl md:text-7xl">
            Have an Interesting Idea? <span className="text-bronze">Let's Connect.</span>
          </h2>
          <dl className="mt-12 space-y-6">
            <div>
              <dt className="eyebrow text-muted-dark">Email</dt>
              <dd className="mt-1 text-xl">
                <a href={`mailto:${site.email}`} className="underline decoration-bronze underline-offset-4 hover:text-bronze">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-dark">Elsewhere</dt>
              <dd className="mt-2 space-y-1 text-muted-dark">
                <p>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                    linkedin.com/in/bhishanrai
                  </a>
                </p>
                <p>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                    github.com/bhishanrai46-tech
                  </a>
                </p>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-dark">Location</dt>
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
