import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { del, list, put } from "@vercel/blob";
import { sanitizeContent } from "./sanitize";
import type { Content } from "./types";

/**
 * Where edits are stored:
 *  - On Vercel: a Vercel Blob store (set up once, see README). Needs BLOB_READ_WRITE_TOKEN.
 *  - Locally: a plain file in .data/ so you can try creator mode on your own computer.
 */
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const DATA_DIR = path.join(process.cwd(), ".data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export class StorageNotConfigured extends Error {
  constructor() {
    super("Saving isn't set up yet. Create a Vercel Blob store for this project (see the README), then redeploy.");
  }
}

const onVercel = !!process.env.VERCEL;

async function readRaw(): Promise<unknown | null> {
  try {
    if (useBlob) {
      const { blobs } = await list({ prefix: "content/site", limit: 100 });
      if (!blobs.length) return null;
      const latest = [...blobs].sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
      const res = await fetch(latest.url, { cache: "force-cache" }); // each save has its own unique URL
      return res.ok ? await res.json() : null;
    }
    return JSON.parse(await fs.readFile(CONTENT_FILE, "utf8"));
  } catch {
    return null;
  }
}

/** The full content including drafts. Used by creator mode and for rendering pages. */
export const getContent = cache(async (): Promise<Content> => sanitizeContent(await readRaw()));

export async function saveContent(content: Content): Promise<void> {
  const body = JSON.stringify(content);
  if (useBlob) {
    await put("content/site.json", body, { access: "public", addRandomSuffix: true, contentType: "application/json" });
    try {
      const { blobs } = await list({ prefix: "content/site", limit: 100 });
      const old = [...blobs].sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt)).slice(8);
      if (old.length) await del(old.map((b) => b.url)); // keep the 8 most recent saves
    } catch {
      /* cleanup is best effort */
    }
    return;
  }
  if (onVercel) throw new StorageNotConfigured();
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, body, "utf8");
}

export async function saveUpload(bytes: Buffer, name: string, mime: string): Promise<string> {
  if (useBlob) {
    const blob = await put(`uploads/${name}`, bytes, { access: "public", addRandomSuffix: false, contentType: mime });
    return blob.url;
  }
  if (onVercel) throw new StorageNotConfigured();
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/api/uploads/${name}`;
}

export async function readLocalUpload(name: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(path.join(UPLOAD_DIR, name));
  } catch {
    return null;
  }
}
