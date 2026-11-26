/* Tiny helpers to read and change a value inside the content object by a path like "projects.0.title". */

/* eslint-disable @typescript-eslint/no-explicit-any */

const bad = (k: string) => k === "__proto__" || k === "constructor" || k === "prototype";

export function getAt<T = unknown>(obj: unknown, path: string): T | undefined {
  if (!path) return obj as T;
  let cur: any = obj;
  for (const k of path.split(".")) {
    if (cur == null || bad(k)) return undefined;
    cur = cur[k];
  }
  return cur as T;
}

export function setAt<T>(obj: T, path: string, value: unknown): T {
  const root: any = structuredClone(obj);
  const keys = path.split(".");
  if (keys.some(bad)) return obj;
  let cur = root;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
    if (cur == null) return obj;
  }
  cur[keys[keys.length - 1]] = value;
  return root;
}

export function updateAt<T>(obj: T, path: string, fn: (value: any) => any): T {
  const cur = structuredClone(getAt(obj, path));
  return setAt(obj, path, fn(cur));
}

export const addTo = (arr: any[] | undefined, item: unknown) => [...(arr ?? []), item];
export const removeFrom = (arr: any[] | undefined, i: number) => (arr ?? []).filter((_, j) => j !== i);
export function moveIn(arr: any[] | undefined, i: number, dir: -1 | 1) {
  const a = [...(arr ?? [])];
  const j = i + dir;
  if (j < 0 || j >= a.length) return a;
  [a[i], a[j]] = [a[j], a[i]];
  return a;
}
