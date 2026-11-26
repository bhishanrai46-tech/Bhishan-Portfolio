"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  FileText,
  Layers,
  LogOut,
  Palette,
  Pencil,
  Plus,
  Save,
  Settings,
  Trash2,
  Undo2,
  Upload,
  X,
} from "lucide-react";
import { BODY_FONTS, defaultTheme, HEADING_FONTS } from "@/content/theme";
import { useContent } from "../edit/ContentProvider";

const bar = "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm transition-colors hover:bg-white/10 disabled:opacity-40";
const input = "w-full border border-white/20 bg-[#0b0c0d] px-3 py-2 text-sm text-[#f5f4f0] placeholder:text-white/40 focus:border-[#c8956a] focus:outline-none";
const small = "flex h-8 w-8 items-center justify-center border border-white/20 hover:border-[#c8956a] hover:text-[#c8956a] disabled:opacity-30";

export function CreatorUI() {
  const { creator, preview, setPreview, panel, setPanel, dirty, save, saveState, discard, logout } = useContent();
  if (!creator) return null;

  const tab = (id: Exclude<typeof panel, null>, label: string, icon: ReactNode) => (
    <button type="button" className={`${bar} ${panel === id ? "bg-white/15" : ""}`} onClick={() => setPanel(panel === id ? null : id)} aria-pressed={panel === id}>
      {icon} <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div data-creator-ui className="text-[#f5f4f0]">
      {panel && !preview && <Drawer />}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[90] flex justify-center px-2">
        <div role="toolbar" aria-label="Creator tools" className="pointer-events-auto flex max-w-full items-center overflow-x-auto border border-white/20 bg-[#0b0c0d] shadow-2xl">
          <button type="button" className={`${bar} ${!preview ? "bg-[#c8956a] text-[#0b0c0d] hover:bg-[#c8956a]" : ""}`} onClick={() => setPreview(false)}>
            <Pencil size={16} /> <span className="hidden sm:inline">Edit</span>
          </button>
          <button type="button" className={`${bar} ${preview ? "bg-[#c8956a] text-[#0b0c0d] hover:bg-[#c8956a]" : ""}`} onClick={() => { setPreview(true); setPanel(null); }}>
            <Eye size={16} /> <span className="hidden sm:inline">Visitor view</span>
          </button>
          <span className="mx-1 h-6 w-px bg-white/20" />
          {tab("design", "Design", <Palette size={16} />)}
          {tab("sections", "Sections", <Layers size={16} />)}
          {tab("pages", "Pages", <FileText size={16} />)}
          {tab("site", "Site", <Settings size={16} />)}
          <span className="mx-1 h-6 w-px bg-white/20" />
          <button type="button" className={bar} onClick={discard} disabled={!dirty} title="Throw away unsaved changes">
            <Undo2 size={16} /> <span className="hidden lg:inline">Discard</span>
          </button>
          <button type="button" className={`${bar} ${dirty ? "bg-emerald-600 hover:bg-emerald-500" : ""}`} onClick={() => void save()} disabled={saveState.status === "saving" || (!dirty && saveState.status !== "error")}>
            <Save size={16} />
            <span>{saveState.status === "saving" ? "Saving…" : saveState.status === "saved" ? "Saved ✓" : dirty ? "Save changes" : "Saved"}</span>
          </button>
          <button type="button" className={bar} onClick={() => void logout()} title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
      {saveState.status === "error" && (
        <div role="alert" className="fixed bottom-16 left-1/2 z-[90] max-w-[92vw] -translate-x-1/2 bg-red-700 px-4 py-2 text-sm text-white shadow-xl">
          {saveState.message}
        </div>
      )}
      {preview && (
        <button type="button" onClick={() => setPreview(false)} className="fixed right-3 top-20 z-[90] bg-[#c8956a] px-3 py-1.5 text-xs text-[#0b0c0d] shadow-lg">
          Viewing as a visitor. Click to edit
        </button>
      )}
    </div>
  );
}

function Drawer() {
  const { panel, setPanel } = useContent();
  const titles = { design: "Design", sections: "Sections", pages: "Pages", site: "Site settings" } as const;
  if (!panel) return null;
  return (
    <aside role="dialog" aria-label={titles[panel]} className="fixed bottom-16 right-0 top-0 z-[85] flex w-[min(100vw,390px)] flex-col border-l border-white/15 bg-[#151719] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
        <h2 className="text-base font-medium">{titles[panel]}</h2>
        <button type="button" aria-label="Close panel" onClick={() => setPanel(null)} className={small}>
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {panel === "design" && <DesignPanel />}
        {panel === "sections" && <SectionsPanel />}
        {panel === "pages" && <PagesPanel />}
        {panel === "site" && <SitePanel />}
      </div>
    </aside>
  );
}

const Label = ({ children }: { children: ReactNode }) => <p className="mb-2 mt-6 text-xs uppercase tracking-widest text-white/50 first:mt-0">{children}</p>;

function ColorField({ label, path }: { label: string; path: string }) {
  const { get, set } = useContent();
  const v = get<string>(path) ?? "#000000";
  return (
    <label className="mb-3 flex items-center justify-between gap-3 text-sm">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <code className="text-xs text-white/50">{v}</code>
        <input type="color" value={v} onChange={(e) => set(path, e.target.value)} className="h-9 w-12 cursor-pointer border border-white/20 bg-transparent p-0.5" aria-label={label} />
      </span>
    </label>
  );
}

function DesignPanel() {
  const { get, set, replace } = useContent();
  return (
    <div>
      <Label>Colours</Label>
      <ColorField label="Dark background" path="theme.ink" />
      <ColorField label="Light background" path="theme.paper" />
      <ColorField label="Alternate light" path="theme.paper2" />
      <ColorField label="Accent (on dark)" path="theme.bronze" />
      <ColorField label="Accent (on light)" path="theme.bronzeDeep" />

      <Label>Fonts</Label>
      <label className="mb-3 block text-sm">
        Headings
        <select className={`${input} mt-1`} value={get<string>("theme.headingFont")} onChange={(e) => set("theme.headingFont", e.target.value)}>
          {HEADING_FONTS.map((f) => (
            <option key={f.name}>{f.name}</option>
          ))}
        </select>
      </label>
      <label className="mb-3 block text-sm">
        Body text
        <select className={`${input} mt-1`} value={get<string>("theme.bodyFont")} onChange={(e) => set("theme.bodyFont", e.target.value)}>
          {BODY_FONTS.map((f) => (
            <option key={f.name}>{f.name}</option>
          ))}
        </select>
      </label>

      <Label>Text size</Label>
      <input type="range" min={85} max={120} step={1} value={get<number>("theme.scale") ?? 100} onChange={(e) => set("theme.scale", Number(e.target.value))} className="w-full accent-[#c8956a]" aria-label="Text size" />
      <p className="mt-1 text-xs text-white/50">{get<number>("theme.scale") ?? 100}% of normal</p>

      <button type="button" className="mt-8 border border-white/25 px-4 py-2 text-sm hover:border-[#c8956a] hover:text-[#c8956a]" onClick={() => replace((c) => ({ ...c, theme: { ...defaultTheme } }))}>
        Reset design to default
      </button>
      <p className="mt-4 text-xs leading-relaxed text-white/50">Changes show instantly. Click “Save changes” to publish them. New fonts load from Google Fonts.</p>
    </div>
  );
}

function SectionsPanel() {
  const { content, replace, set } = useContent();
  const secs = content.sections;
  const mv = (i: number, d: -1 | 1) =>
    replace((c) => {
      const a = [...c.sections];
      const j = i + d;
      if (j < 0 || j >= a.length) return c;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...c, sections: a };
    });
  return (
    <div>
      <p className="mb-4 text-xs leading-relaxed text-white/60">Reorder sections, hide ones you don't want yet, and choose which appear in the top menu.</p>
      <ul className="space-y-2">
        {secs.map((s, i) => (
          <li key={s.id} className={`border border-white/15 p-3 ${s.visible ? "" : "opacity-60"}`}>
            <div className="flex items-center gap-2">
              <input className={input} value={s.label} onChange={(e) => set(`sections.${i}.label`, e.target.value)} aria-label="Menu label" />
              <button type="button" className={small} aria-label="Move up" disabled={i === 0} onClick={() => mv(i, -1)}>
                <ArrowUp size={14} />
              </button>
              <button type="button" className={small} aria-label="Move down" disabled={i === secs.length - 1} onClick={() => mv(i, 1)}>
                <ArrowDown size={14} />
              </button>
              <button type="button" className={small} aria-label={s.visible ? "Hide section" : "Show section"} onClick={() => set(`sections.${i}.visible`, !s.visible)}>
                {s.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
            <label className="mt-2 flex items-center gap-2 text-xs text-white/70">
              <input type="checkbox" checked={s.nav} onChange={(e) => set(`sections.${i}.nav`, e.target.checked)} className="accent-[#c8956a]" /> Show in top menu
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PagesPanel() {
  const { content, dirty, set, remove, createEntry } = useContent();
  const group = (title: string, kind: "project" | "note" | "page", path: "projects" | "notes" | "pages", base: string, items: { slug: string; title: string; draft?: boolean }[]) => (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <Label>{title}</Label>
        <button type="button" className="flex items-center gap-1 border border-white/25 px-2.5 py-1 text-xs hover:border-[#c8956a] hover:text-[#c8956a]" onClick={() => void createEntry(kind)}>
          <Plus size={13} /> New
        </button>
      </div>
      {items.length === 0 && <p className="text-xs text-white/40">Nothing here yet.</p>}
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={it.slug} className="flex items-center gap-2 border border-white/15 p-2.5 text-sm">
            <div className="min-w-0 flex-1">
              {dirty ? (
                <span className="block truncate text-white/60" title="Save first to open">{it.title}</span>
              ) : (
                <Link href={`${base}/${it.slug}`} className="block truncate hover:text-[#c8956a]">{it.title}</Link>
              )}
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40">{it.draft ? "Draft: hidden" : "Published"}</span>
            </div>
            <button type="button" className={`${small} w-auto px-2 text-xs`} onClick={() => set(`${path}.${i}.draft`, !it.draft)}>
              {it.draft ? "Publish" : "Unpublish"}
            </button>
            <button
              type="button"
              className={small}
              aria-label={`Delete ${it.title}`}
              onClick={() => {
                if (window.confirm(`Delete “${it.title}”? This can't be undone after you save.`)) remove(path, i);
              }}
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <p className="mb-5 text-xs leading-relaxed text-white/60">
        Each of these has its own web address. New ones start as drafts: write them, then press Publish and Save. {dirty && <b className="text-[#c8956a]">Save your changes to open a page.</b>}
      </p>
      {group("Projects", "project", "projects", "/projects", content.projects)}
      {group("Articles", "note", "notes", "/notes", content.notes)}
      {group("Custom pages", "page", "pages", "/p", content.pages)}
      {content.pages.length > 0 && (
        <div>
          <Label>Show in top menu</Label>
          {content.pages.map((p, i) => (
            <label key={p.slug} className="mb-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={p.showInNav} onChange={(e) => set(`pages.${i}.showInNav`, e.target.checked)} className="accent-[#c8956a]" /> {p.title}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function SitePanel() {
  const { get, set, upload } = useContent();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");
  const field = (label: string, path: string, textarea = false) => (
    <label className="mb-4 block text-sm">
      {label}
      {textarea ? (
        <textarea className={`${input} mt-1`} rows={4} value={get<string>(path) ?? ""} onChange={(e) => set(path, e.target.value)} />
      ) : (
        <input className={`${input} mt-1`} value={get<string>(path) ?? ""} onChange={(e) => set(path, e.target.value)} />
      )}
    </label>
  );
  async function onCv(f?: File) {
    if (!f) return;
    setMsg("Uploading…");
    try {
      set("site.cv", await upload(f, "file"));
      setMsg("Uploaded. Save to publish it.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed.");
    }
  }
  return (
    <div>
      {field("Your name", "site.name")}
      {field("Short name (logo)", "site.shortName")}
      {field("Email", "site.email")}
      {field("LinkedIn address", "site.linkedin")}
      {field("GitHub address", "site.github")}
      {field("Search-engine description", "site.description", true)}
      <Label>CV / resume file</Label>
      <p className="mb-2 break-all text-xs text-white/50">{get<string>("site.cv")}</p>
      <button type="button" onClick={() => file.current?.click()} className="flex items-center gap-2 border border-white/25 px-4 py-2 text-sm hover:border-[#c8956a] hover:text-[#c8956a]">
        <Upload size={15} /> Upload PDF or Word file
      </button>
      <input ref={file} type="file" hidden accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => onCv(e.target.files?.[0])} />
      {msg && <p className="mt-2 text-xs text-white/60">{msg}</p>}
    </div>
  );
}
