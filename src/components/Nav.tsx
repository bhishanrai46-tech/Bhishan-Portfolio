"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { ELink } from "./edit/ELink";
import { useContent } from "./edit/ContentProvider";
import { useNavItems } from "./useNav";

export function Nav() {
  const { content, editing } = useContent();
  const items = useNavItems();
  const { site, labels } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ids = items.map((n) => n.href.split("#")[1]).filter(Boolean).join(",");
  useEffect(() => {
    const els = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line-dark bg-ink/90 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="/#home" className="display text-2xl text-paper" aria-label={`${site.name}, home`}>
          {site.shortName}
          <span className="text-bronze">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {items.map((n) => {
            const id = n.href.split("#")[1];
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === id ? "true" : undefined}
                className={`text-sm transition-colors hover:text-paper ${active === id ? "text-paper" : "text-muted-dark"}`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ELink
            href={site.cv}
            download
            className="hidden items-center gap-2 border border-bronze px-4 py-2 text-sm text-paper transition-colors hover:bg-bronze hover:text-ink sm:inline-flex"
          >
            <Download size={15} aria-hidden /> {labels.downloadCv}
          </ELink>
          <button type="button" className="p-2 text-paper lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink px-6 pb-24 pt-6 lg:hidden">
          <ul className="space-y-1">
            {items.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="display block border-b border-line-dark py-4 text-4xl text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          {!editing && (
            <a href={site.cv} download className="mt-8 inline-flex items-center gap-2 border border-bronze px-5 py-3 text-paper">
              <Download size={16} aria-hidden /> {labels.downloadCv}
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
