"use client";

import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useContent } from "./ContentProvider";

const btn =
  "flex h-7 w-7 items-center justify-center bg-[#0b0c0d] text-[#f5f4f0] transition-colors hover:bg-[#c8956a] hover:text-[#0b0c0d] disabled:opacity-30 disabled:hover:bg-[#0b0c0d] disabled:hover:text-[#f5f4f0]";

/** Small move-up / move-down / delete bar on an item. The parent element must be `relative`. */
export function ItemControls({
  path,
  index,
  count,
  className = "right-2 top-2",
}: {
  path: string;
  index: number;
  count: number;
  className?: string;
}) {
  const { editing, move, remove } = useContent();
  if (!editing) return null;
  return (
    <div className={`absolute z-30 flex border border-white/20 shadow-lg ${className}`} data-creator-ui>
      <button type="button" className={btn} aria-label="Move up" disabled={index === 0} onClick={() => move(path, index, -1)}>
        <ArrowUp size={14} />
      </button>
      <button type="button" className={btn} aria-label="Move down" disabled={index === count - 1} onClick={() => move(path, index, 1)}>
        <ArrowDown size={14} />
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Delete"
        onClick={() => {
          if (window.confirm("Delete this item?")) remove(path, index);
        }}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

/** "+ Add ..." button shown only in creator mode. */
export function AddItem({
  path,
  item,
  label,
  className = "",
  light = false,
}: {
  path: string;
  item: unknown;
  label: string;
  className?: string;
  light?: boolean;
}) {
  const { editing, add } = useContent();
  if (!editing) return null;
  return (
    <button
      type="button"
      data-creator-ui
      onClick={() => add(path, typeof item === "object" && item !== null ? structuredClone(item) : item)}
      className={`inline-flex items-center gap-2 border border-dashed px-4 py-2.5 text-sm transition-colors ${
        light ? "border-paper/40 text-paper hover:border-[#c8956a] hover:text-[#c8956a]" : "border-ink/40 text-ink hover:border-bronze-deep hover:text-bronze-deep"
      } ${className}`}
    >
      <Plus size={15} /> {label}
    </button>
  );
}

export function EditOnly({ children }: { children: ReactNode }) {
  const { editing } = useContent();
  return editing ? <>{children}</> : null;
}
