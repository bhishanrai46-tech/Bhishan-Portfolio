"use client";

import { createElement, type ClipboardEvent, type ElementType, type FocusEvent, type KeyboardEvent } from "react";
import { useContent } from "./ContentProvider";

/**
 * Editable text. Visitors see normal text; in creator mode you click it and type.
 * `path` points into the content, e.g. "about.paragraphs.0".
 */
export function T({
  path,
  as = "span",
  className = "",
  multiline = false,
  placeholder = "Click to edit",
}: {
  path: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  const { get, set, editing, version } = useContent();
  const value = String(get<string>(path) ?? "");

  if (!editing) {
    if (!value) return null;
    return createElement(as, { className, style: multiline ? { whiteSpace: "pre-line" } : undefined }, value);
  }

  const commit = (e: FocusEvent<HTMLElement>) => {
    let text = e.currentTarget.innerText.replace(/ /g, " ");
    text = multiline ? text.replace(/\n+$/, "") : text.replace(/\s*\n+\s*/g, " ").trim();
    if (text !== value) set(path, text);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") e.currentTarget.blur();
  };
  const onPaste = (e: ClipboardEvent<HTMLElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, multiline ? text : text.replace(/\s*\n+\s*/g, " "));
  };

  return createElement(
    as,
    {
      key: version,
      className: `${className} cb-edit`,
      contentEditable: true,
      suppressContentEditableWarning: true,
      spellCheck: true,
      "data-placeholder": placeholder,
      style: multiline ? { whiteSpace: "pre-wrap" } : undefined,
      onBlur: commit,
      onKeyDown,
      onPaste,
    },
    value,
  );
}
