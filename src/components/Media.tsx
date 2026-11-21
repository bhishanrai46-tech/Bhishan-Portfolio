import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Shows the image if the file exists in /public, otherwise a clean placeholder.
 * Put your photos in /public/images and set the path in src/data/site.ts.
 */
export function Media({ src, alt, label = "Photo", className = "", sizes = "100vw", priority }: Props) {
  const exists = !!src && fs.existsSync(path.join(process.cwd(), "public", src));

  if (exists && src) {
    return (
      <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (placeholder)`}
      className={`relative overflow-hidden bg-ink-2 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--color-line-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-dark) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="h-px w-8 bg-bronze" />
        {label && <span className="eyebrow text-muted-dark">{label}</span>}
      </div>
    </div>
  );
}
