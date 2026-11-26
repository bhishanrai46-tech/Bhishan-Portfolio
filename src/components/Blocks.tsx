"use client";

import type { Block } from "@/content/types";
import { templates } from "@/content/templates";
import { Media } from "./Media";
import { T } from "./edit/T";
import { AddItem, ItemControls } from "./edit/ItemControls";
import { useContent } from "./edit/ContentProvider";

/** A column of headings, paragraphs, quotes and images that you can add to and reorder. */
export function Blocks({ path }: { path: string }) {
  const { get } = useContent();
  const blocks = get<Block[]>(path) ?? [];

  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <div key={i} className="relative">
          <ItemControls path={path} index={i} count={blocks.length} className="-top-3 right-0" />
          {b.type === "h2" && <T path={`${path}.${i}.text`} as="h2" className="display block pt-6 text-4xl md:text-5xl" placeholder="Heading" />}
          {b.type === "p" && <T path={`${path}.${i}.text`} as="p" multiline className="block text-lg leading-relaxed" placeholder="Write something…" />}
          {b.type === "quote" && (
            <T path={`${path}.${i}.text`} as="blockquote" multiline className="display block border-l-2 border-bronze pl-6 text-3xl md:text-4xl" placeholder="Quote" />
          )}
          {b.type === "image" && (
            <figure>
              <Media src={b.src} path={`${path}.${i}.src`} alt={b.caption || "Image"} label="Click to add image" className="aspect-[16/9] w-full" />
              <T path={`${path}.${i}.caption`} as="figcaption" className="mt-2 block text-sm text-muted" placeholder="Caption (optional)" />
            </figure>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-2 pt-4">
        <AddItem path={path} item={templates.block.h2} label="Heading" />
        <AddItem path={path} item={templates.block.p} label="Paragraph" />
        <AddItem path={path} item={templates.block.quote} label="Quote" />
        <AddItem path={path} item={templates.block.image} label="Image" />
      </div>
    </div>
  );
}
