// The icon list at build time, read from the same index the browser loads.
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import type { Category, IconIndex, IconMeta } from "./icons";

let cached: IconIndex | null = null;
const index = () => (cached ??= JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/index.json"), "utf8")) as IconIndex);

/** Every icon, badged versions included. */
export const iconCount = () => index().icons.length;

/** The gzipped size in bytes of each named icon's ES module, or 0 if it is not built. */
export const moduleBytes = (names: string[]) =>
  names.map((name) => {
    try {
      return gzipSync(fs.readFileSync(path.join(process.cwd(), "../packages/core/dist/icons", `${name}.js`))).length;
    } catch {
      return 0;
    }
  });

let keywordsCache: Record<string, { zh: string[] }> | null = null;
/** An icon's Chinese search words; the first is its name in Chinese. */
export const zhWords = (name: string) =>
  (keywordsCache ??= JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/keywords.json"), "utf8")))![name]?.zh ?? [];

/** Base icons only: a badged version is shown on its base icon's page. */
export const baseIcons = () => index().icons.filter((i) => !i.base);
export const iconByName = (name: string) => baseIcons().find((i) => i.name === name);
/** The icon and all of its badged versions. */
export const familyOf = (name: string) => index().icons.filter((i) => i.name === name || i.base === name);
export const allCategories = (): Category[] => {
  const used = new Set(baseIcons().map((i) => i.category));
  return index().categories.filter((c) => used.has(c.id));
};
export const categoryById = (id: string) => allCategories().find((c) => c.id === id);
export const iconsIn = (category: string) => baseIcons().filter((i) => i.category === category);

/** Icons to suggest beside one: most shared tags first, then others from its category. */
export function relatedTo(meta: IconMeta, limit = 12) {
  const tags = new Set(meta.tags);
  const score = (i: IconMeta) => i.tags.filter((t) => tags.has(t)).length;
  return baseIcons()
    .filter((i) => i.name !== meta.name && (i.category === meta.category || score(i) > 0))
    .map((i) => ({ i, s: score(i) * 2 + (i.category === meta.category ? 1 : 0) }))
    .sort((a, b) => b.s - a.s || a.i.name.localeCompare(b.i.name))
    .slice(0, limit)
    .map(({ i }) => i);
}
