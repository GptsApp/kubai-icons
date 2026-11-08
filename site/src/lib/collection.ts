// The visitor's saved icons. There are no accounts: the list lives in this browser's
// localStorage, and a link carries it elsewhere. Entries hold only what the visitor chose,
// never the artwork, so a saved icon always downloads in its current drawing.
import { useSyncExternalStore } from "react";
import { download, resolvedSvg, svgToPng } from "./export";
import { loadCategory, loadIndex, peekIcon } from "./icons";
import { asset } from "./site";

export type SavedIcon = { name: string; color: string; variant: "color" | "soft"; badge?: string };

const KEY = "kubai-icons:collection";
const SHARE = "#collection=";
const NAME = /^[a-z0-9-]+$/;
const HEX = /^#[0-9a-f]{3,8}$/i;
const EMPTY: SavedIcon[] = [];

let items = EMPTY;
/** The stored text `items` was last read from or written to. */
let stored: string | null = null;
let started = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

/** Drops malformed entries and repeated names, since storage and links can hold anything. */
function clean(raw: unknown): SavedIcon[] {
  if (!Array.isArray(raw)) return EMPTY;
  const seen = new Set<string>();
  return raw.flatMap((i) => {
    if (!i || !NAME.test(i.name) || !HEX.test(i.color) || seen.has(i.name)) return [];
    seen.add(i.name);
    return [{ name: i.name, color: i.color, variant: i.variant === "soft" ? "soft" as const : "color" as const, ...(i.badge ? { badge: "semantic" } : {}) }];
  });
}

/** Reads the stored list. When storage is blocked, the list in memory carries on. */
function pull() {
  try {
    const text = localStorage.getItem(KEY);
    if (text === stored) return false;
    stored = text;
    items = text ? clean(JSON.parse(text).items) : EMPTY;
    return true;
  } catch {
    return false;
  }
}

/** Every change starts from the stored list, so what another tab saved is kept. */
function change(next: (list: SavedIcon[]) => SavedIcon[]) {
  pull();
  items = next(items);
  try {
    const text = JSON.stringify({ v: 1, items });
    localStorage.setItem(KEY, text);
    stored = text;
  } catch {
    // Storage may be blocked or full; the list still works until the page closes.
  }
  notify();
}

const onStorage = (e: StorageEvent) => { if ((e.key === KEY || e.key === null) && pull()) notify(); };
function subscribe(listener: () => void) {
  if (!listeners.size) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}
export function savedIcons() {
  if (!started) { started = true; pull(); }
  return items;
}

export const useCollection = () => useSyncExternalStore(subscribe, savedIcons, () => EMPTY);
export const useSaved = (name: string) => useSyncExternalStore(subscribe, () => savedIcons().some((i) => i.name === name), () => false);

export const toggleSaved = (item: SavedIcon) =>
  change((list) => (list.some((i) => i.name === item.name) ? list.filter((i) => i.name !== item.name) : [...list, item]));
export const removeSaved = (name: string) => change((list) => list.filter((i) => i.name !== name));
export const recolorSaved = (pick: (item: SavedIcon) => string) => change((list) => list.map((i) => ({ ...i, color: pick(i) })));
export const restyleSaved = (variant: SavedIcon["variant"]) => change((list) => list.map((i) => ({ ...i, variant })));
export const replaceSaved = (list: SavedIcon[]) => change(() => list);
/** Adds the icons that are not saved yet, leaving saved ones as they are. Returns how many were new. */
export function addSaved(more: SavedIcon[]) {
  const before = savedIcons().length;
  change((list) => clean([...list, ...more]));
  return savedIcons().length - before;
}

/** A link that adds these icons to whoever opens it. The list stays in the fragment, which is never sent to a server. */
export function shareLink(list: SavedIcon[]) {
  const entries = list.map((i) => {
    const flags = (i.variant === "soft" ? "s" : "") + (i.badge ? "b" : "");
    return [i.name, i.color.slice(1), ...(flags ? [flags] : [])].join(".");
  });
  return `${window.location.origin}${asset("/icons/")}${SHARE}${entries.join(",")}`;
}

/** The icons in the current address, if it is a shared link. Removes them from the address. */
export function takeSharedIcons(): SavedIcon[] {
  const { hash, pathname, search } = window.location;
  if (!hash.startsWith(SHARE)) return EMPTY;
  window.history.replaceState(null, "", pathname + search);
  // Some apps escape the commas when they pass a link along.
  return clean(hash.slice(SHARE.length).replace(/%2C/gi, ",").split(",").map((entry) => {
    const [name, hex, flags = ""] = entry.split(".");
    return { name, color: `#${hex}`, variant: flags.includes("s") ? "soft" : "color", badge: flags.includes("b") };
  }));
}

export type CollectionFormat = "svg" | "png";

/** Downloads the icons as one ZIP file and returns how many it holds. */
export async function downloadCollection(list: SavedIcon[], format: CollectionFormat) {
  const [{ zipSync }, index] = await Promise.all([import("fflate"), loadIndex()]);
  const known = new Map(index.icons.map((i) => [i.name, i]));
  const found = list.filter((i) => known.has(i.name));
  await Promise.all([...new Set(found.map((i) => known.get(i.name)!.category))].map(loadCategory));
  if (found.some((i) => !peekIcon(i.name))) throw new Error("Some icons could not be loaded");
  const files: Record<string, Uint8Array> = {};
  const encoder = new TextEncoder();
  for (const item of found) {
    const icon = peekIcon(item.name)!;
    const svg = resolvedSvg(icon, { color: item.color, variant: item.variant, badgeColor: item.badge, size: 96 });
    files[`${item.name}.${format}`] = format === "svg" ? encoder.encode(svg) : new Uint8Array(await (await svgToPng(svg, 512)).arrayBuffer());
  }
  const count = Object.keys(files).length;
  if (!count) throw new Error("Nothing to download");
  download("kubai-icons.zip", new Blob([zipSync(files) as BlobPart], { type: "application/zip" }));
  return count;
}
