"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { safeSrc } from "@/lib/url";
import { useContent } from "./edit/ContentProvider";

/**
 * Shows the image at `src`. In creator mode, upload or remove it with the buttons.
 * With no image, shows a plain grid tile (visitors) or an upload prompt (creator).
 */
export function Media({
  src,
  path,
  alt,
  label = "Photo",
  className = "",
  priority,
}: {
  src?: string;
  path?: string; // content path of the image address, enables uploading
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  const { editing, set, upload } = useContent();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const url = safeSrc(src);

  async function onFile(file?: File) {
    if (!file || !path) return;
    setBusy(true);
    setError("");
    try {
      set(path, await upload(file, "image"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (no image yet)`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-dark) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <span className="h-px w-8 bg-bronze" />
          {editing && label && <span className="eyebrow text-muted-dark">{label}</span>}
        </div>
      )}

      {editing && path && (
        <div className="absolute inset-x-2 top-2 z-30 flex flex-wrap items-center gap-1.5" data-creator-ui>
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            className="flex items-center gap-1.5 bg-[#0b0c0d] px-3 py-1.5 text-xs text-[#f5f4f0] shadow-lg transition-colors hover:bg-[#c8956a] hover:text-[#0b0c0d] disabled:opacity-60"
          >
            <ImagePlus size={14} /> {busy ? "Uploading…" : url ? "Change image" : "Upload image"}
          </button>
          {url && (
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => set(path, "")}
              className="flex h-7 w-7 items-center justify-center bg-[#0b0c0d] text-[#f5f4f0] shadow-lg transition-colors hover:bg-red-600"
            >
              <Trash2 size={14} />
            </button>
          )}
          {error && <span className="bg-red-700 px-2 py-1 text-xs text-white">{error}</span>}
          <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
      )}
    </div>
  );
}
