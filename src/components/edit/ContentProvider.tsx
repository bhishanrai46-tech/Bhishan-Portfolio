"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Content } from "@/content/types";
import { addTo, getAt, moveIn, removeFrom, setAt, updateAt } from "@/content/paths";
import { templates } from "@/content/templates";
import { uniqueSlug } from "@/lib/url";

type Panel = null | "design" | "sections" | "pages" | "site";
type SaveState = { status: "idle" | "saving" | "saved" | "error"; message?: string };
type EntryKind = "project" | "note" | "page";

type Ctx = {
  content: Content;
  creator: boolean; // logged in as creator
  ready: boolean; // full content (with drafts) loaded
  editing: boolean; // creator and not previewing
  preview: boolean;
  setPreview: (v: boolean) => void;
  dirty: boolean;
  version: number; // bumps when edits are discarded, so editable text resets
  panel: Panel;
  setPanel: (p: Panel) => void;
  saveState: SaveState;
  get: <T = unknown>(path: string) => T;
  set: (path: string, value: unknown) => void;
  add: (path: string, item: unknown) => void;
  remove: (path: string, index: number) => void;
  move: (path: string, index: number, dir: -1 | 1) => void;
  replace: (fn: (c: Content) => Content) => void;
  save: () => Promise<boolean>;
  discard: () => void;
  upload: (file: File, kind?: "image" | "file") => Promise<string>;
  createEntry: (kind: EntryKind) => Promise<void>;
  logout: () => Promise<void>;
};

const C = createContext<Ctx | null>(null);

export function useContent() {
  const c = useContext(C);
  if (!c) throw new Error("useContent must be used inside ContentProvider");
  return c;
}

/** Shrink big photos in the browser before uploading (keeps pages fast and under the upload limit). */
async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const max = 2000;
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 900_000) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.86));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], "image.webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

export function ContentProvider({ initial, children }: { initial: Content; children: ReactNode }) {
  const router = useRouter();
  const [content, setContent] = useState<Content>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [creator, setCreator] = useState(false);
  const [ready, setReady] = useState(false);
  const [preview, setPreview] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [version, setVersion] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle" });
  const ref = useRef(content);

  const update = useCallback((fn: (c: Content) => Content) => {
    const next = fn(ref.current);
    ref.current = next;
    setContent(next);
  }, []);

  // If the creator cookie hint is present, load the full content (including drafts).
  useEffect(() => {
    if (!document.cookie.split("; ").includes("bb_creator=1")) return;
    let cancelled = false;
    fetch("/api/creator/content", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("not logged in");
        const full = (await r.json()) as Content;
        if (cancelled) return;
        ref.current = full;
        setContent(full);
        setSaved(JSON.stringify(full));
        setCreator(true);
        setReady(true);
      })
      .catch(() => {
        document.cookie = "bb_creator=; Max-Age=0; path=/";
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = useMemo(() => creator && JSON.stringify(content) !== saved, [content, saved, creator]);
  const editing = creator && !preview;

  useEffect(() => {
    document.body.classList.toggle("has-creator-bar", creator);
  }, [creator]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const get = useCallback(<T,>(path: string) => getAt(content, path) as T, [content]);

  const set = useCallback(
    (path: string, value: unknown) =>
      update((c) => {
        let next = setAt(c, path, value);
        // Replacing sample text means it is no longer a placeholder.
        const parentPath = path.split(".").slice(0, -1).join(".");
        const parent = parentPath ? getAt<Record<string, unknown>>(next, parentPath) : null;
        if (parent && parent.placeholder === true) next = setAt(next, `${parentPath}.placeholder`, false);
        return next;
      }),
    [update],
  );
  const add = useCallback((path: string, item: unknown) => update((c) => updateAt(c, path, (a) => addTo(a, item))), [update]);
  const remove = useCallback((path: string, i: number) => update((c) => updateAt(c, path, (a) => removeFrom(a, i))), [update]);
  const move = useCallback((path: string, i: number, d: -1 | 1) => update((c) => updateAt(c, path, (a) => moveIn(a, i, d))), [update]);

  const save = useCallback(async () => {
    const sent = ref.current;
    setSaveState({ status: "saving" });
    try {
      const res = await fetch("/api/creator/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sent),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; content?: Content };
      if (!res.ok || !data.content) {
        if (res.status === 401) document.cookie = "bb_creator=; Max-Age=0; path=/";
        setSaveState({ status: "error", message: data.error ?? "Couldn't save." });
        return false;
      }
      setSaved(JSON.stringify(data.content));
      if (ref.current === sent) update(() => data.content as Content); // adopt any tidy-ups the server made
      setSaveState({ status: "saved" });
      setTimeout(() => setSaveState((s) => (s.status === "saved" ? { status: "idle" } : s)), 2500);
      return true;
    } catch {
      setSaveState({ status: "error", message: "Couldn't reach the server." });
      return false;
    }
  }, [update]);

  const discard = useCallback(() => {
    const prev = JSON.parse(saved) as Content;
    ref.current = prev;
    setContent(prev);
    setVersion((v) => v + 1);
  }, [saved]);

  const upload = useCallback(async (file: File, kind: "image" | "file" = "image") => {
    const body = new FormData();
    body.append("file", kind === "image" ? await shrinkImage(file) : file);
    body.append("kind", kind);
    const res = await fetch("/api/creator/upload", { method: "POST", body });
    const data = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
    if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed.");
    return data.url;
  }, []);

  const createEntry = useCallback(
    async (kind: EntryKind) => {
      const c = ref.current;
      if (kind === "project") {
        const slug = uniqueSlug("new-project", c.projects.map((p) => p.slug));
        update((x) => ({ ...x, projects: [...x.projects, templates.project(slug, String(x.projects.length + 1).padStart(2, "0"))] }));
        if (await save()) router.push(`/projects/${slug}`);
      } else if (kind === "note") {
        const slug = uniqueSlug("new-article", c.notes.map((n) => n.slug));
        update((x) => ({ ...x, notes: [...x.notes, templates.note(slug)] }));
        if (await save()) router.push(`/notes/${slug}`);
      } else {
        const slug = uniqueSlug("new-page", c.pages.map((p) => p.slug));
        update((x) => ({ ...x, pages: [...x.pages, templates.page(slug)] }));
        if (await save()) router.push(`/p/${slug}`);
      }
    },
    [router, save, update],
  );

  const logout = useCallback(async () => {
    await fetch("/api/creator/logout", { method: "POST" });
    window.location.href = "/";
  }, []);

  // Ctrl/Cmd+S saves
  useEffect(() => {
    if (!creator) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [creator, save]);

  const value: Ctx = {
    content,
    creator,
    ready,
    editing,
    preview,
    setPreview,
    dirty,
    version,
    panel,
    setPanel,
    saveState,
    get,
    set,
    add,
    remove,
    move,
    replace: update,
    save,
    discard,
    upload,
    createEntry,
    logout,
  };
  return <C.Provider value={value}>{children}</C.Provider>;
}
