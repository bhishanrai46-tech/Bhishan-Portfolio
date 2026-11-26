"use client";

import { Socials } from "./Socials";
import { useContent } from "./edit/ContentProvider";
import { useNavItems } from "./useNav";

export function Footer() {
  const { content } = useContent();
  const items = useNavItems();
  const { site } = content;
  return (
    <footer className="on-dark border-t border-line-dark bg-ink py-12 text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="display text-3xl">
            {site.name}
            <span className="text-bronze">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-dark">{site.title}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted-dark">
            {items.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Socials />
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-line-dark px-6 pt-6 text-xs text-muted-dark md:px-10">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </div>
    </footer>
  );
}
