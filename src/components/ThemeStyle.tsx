"use client";

import { fontsHref, themeCss } from "@/content/theme";
import { useContent } from "./edit/ContentProvider";

/** Applies the colours, fonts and text size from the Design panel. Rendered on the server too, so there's no flash. */
export function ThemeStyle() {
  const { content } = useContent();
  const href = fontsHref(content.theme);
  return (
    <>
      {href && <link rel="stylesheet" href={href} precedence="theme-fonts" />}
      <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss(content.theme) }} />
    </>
  );
}
