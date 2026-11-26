"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { safeHref } from "@/lib/url";
import { useContent } from "./ContentProvider";

/** A link that turns into plain text in creator mode, so you can edit its words without leaving the page. */
export function ELink({
  href,
  children,
  className,
  download,
  external,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const { editing } = useContent();
  if (editing) return <span className={className}>{children}</span>;
  const h = safeHref(href);
  if (h.startsWith("/") && !h.startsWith("/#") && !download) {
    return (
      <Link href={h} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={h}
      className={className}
      aria-label={ariaLabel}
      download={download}
      {...(external || /^https?:/i.test(h) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
