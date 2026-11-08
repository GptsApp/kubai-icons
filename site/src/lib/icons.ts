// Icon data for the site: the search index loads once; markup and motion load per
// category, the first time an icon of that category scrolls into view.
import type { KubaiIconData } from "kubai-icons";
import { asset } from "./site";

export type IconMeta = {
  name: string;
  category: string;
  tags: string[];
  base?: string;
  badge?: string;
  tap?: boolean;
  by?: string;
};
export type Category = { id: string; en: string };
export type IconIndex = { version: string; count: number; bases: number; categories: Category[]; hashes: Record<string, string>; icons: IconMeta[] };

let indexPromise: Promise<IconIndex> | null = null;
export function loadIndex(): Promise<IconIndex> {
  indexPromise ??= fetch(asset("/data/index.json")).then((r) => {
    if (!r.ok) throw new Error(`index.json: ${r.status}`);
    return r.json();
  }).catch((e) => {
    indexPromise = null;
    throw e;
  });
  return indexPromise;
}

const loaded = new Map<string, KubaiIconData>();
const pending = new Map<string, Promise<void>>();
export const peekIcon = (name: string) => loaded.get(name);
export function loadCategory(category: string): Promise<void> {
  if (!pending.has(category)) {
    // A pre-bundled module in public/, loaded as is rather than through the bundler. The hash
    // changes with the file's content, so the browser can keep each version indefinitely.
    pending.set(
      category,
      loadIndex().then(({ hashes }) => {
        const url = asset(`/data/icons/${category}.js?v=${hashes[category]}`);
        return import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url);
      }).then(
        (m: { default: KubaiIconData[] }) => {
          for (const ic of m.default) loaded.set(ic.name, ic);
        },
        () => {
          pending.delete(category);
        }
      )
    );
  }
  return pending.get(category)!;
}

// ---------- Search ----------
export type Keywords = { shape: string[]; object: string[]; meaning: string[]; action: string[]; zh: string[] };
export type KeywordIndex = Record<string, Keywords>;

let keywordsPromise: Promise<KeywordIndex> | null = null;
export function loadKeywords(): Promise<KeywordIndex> {
  keywordsPromise ??= fetch(asset("/data/keywords.json"))
    .then((r) => {
      if (!r.ok) throw new Error(`keywords.json: ${r.status}`);
      return r.json();
    })
    .catch((e) => {
      keywordsPromise = null;
      throw e;
    });
  return keywordsPromise;
}

/** The keyword groups shown to readers. Chinese terms are searchable but not listed. */
export const FACETS = [
  { key: "object", label: "Object" },
  { key: "shape", label: "Shape" },
  { key: "meaning", label: "Meaning" },
  { key: "action", label: "Used for" },
] as const;

type Phrase = { text: string; words: string[] };
type Field = { phrases: Phrase[]; weight: number };
export type Searchable = IconMeta & { nameWords: string[]; fields: Field[] };

const HAN = /\p{Script=Han}/u;
const phrase = (raw: string): Phrase => {
  const text = raw.toLowerCase();
  return { text, words: text.split(/[\s-]+/).filter(Boolean) };
};
const field = (values: string[] | undefined, weight: number): Field => ({ phrases: (values ?? []).map(phrase), weight });

/** A badged version is found by its base icon's keywords too. */
export const prepare = (icons: IconMeta[], keywords: KeywordIndex = {}): Searchable[] =>
  icons.map((ic) => {
    const kw = keywords[ic.base ?? ic.name];
    return {
      ...ic,
      nameWords: ic.name.split("-"),
      fields: [field(kw?.object, 30), field(kw?.zh, 30), field(ic.tags, 20), field(kw?.meaning, 18), field(kw?.action, 14), field(kw?.shape, 12)],
    };
  });

/** How well a phrase answers a term, from 0 to 1. Matches start at a word, so "art" skips "cart". */
function closeness({ text, words }: Phrase, term: string, prefixFrom: number) {
  if (text === term) return 1;
  if (words.includes(term)) return 0.85;
  if (HAN.test(term)) return text.includes(term) ? 0.7 : 0;
  return term.length >= prefixFrom && words.some((w) => w.startsWith(term)) ? 0.55 : 0;
}

/** The best phrase for a term across an icon's keywords and tags. */
function bestPhrase(ic: Searchable, term: string, prefixFrom = 2) {
  let score = 0, text: string | null = null;
  for (const f of ic.fields) {
    for (const p of f.phrases) {
      const s = closeness(p, term, prefixFrom) * f.weight;
      if (s > score) { score = s; text = p.text; }
    }
  }
  return { score, text };
}

const nameScore = (ic: Searchable, term: string, prefixFrom = 2) => {
  if (ic.name === term) return 100;
  if (ic.nameWords.includes(term)) return 50;
  if (term.length >= prefixFrom && ic.nameWords.some((w) => w.startsWith(term))) return 40;
  return term.length > 3 && ic.name.includes(term) ? 10 : 0;
};

/** A plural also matches its singular. */
const forms = (term: string) => (term.length > 3 && term.endsWith("s") ? [term, term.slice(0, -1)] : [term]);
const termScore = (ic: Searchable, term: string, prefixFrom = 2) =>
  Math.max(...forms(term).map((t) => Math.max(nameScore(ic, t, prefixFrom), bestPhrase(ic, t, prefixFrom).score)));
/** A short word in a longer query ("in" in "sign in") must be a whole word. */
const prefixFromFor = (terms: string[]) => (terms.length > 1 ? 3 : 2);
const hasPhrase = (ic: Searchable, q: string) => ic.fields.some((f) => f.phrases.some((p) => p.text === q));
const termsOf = (query: string) => query.trim().toLowerCase().split(/\s+/).filter(Boolean);

/** Every query word must match; the name counts most, then what the icon is, then its uses and shape. */
export function search(list: Searchable[], query: string): Searchable[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const terms = termsOf(q);
  const prefixFrom = prefixFromFor(terms);
  const scored: [Searchable, number][] = [];
  for (const ic of list) {
    let total = (ic.name === q.replace(/\s+/g, "-") ? 100 : 0) + (terms.length > 1 && hasPhrase(ic, q) ? 60 : 0);
    let ok = true;
    for (const t of terms) {
      const s = termScore(ic, t, prefixFrom);
      if (!s) { ok = false; break; }
      total += s;
    }
    if (ok) scored.push([ic, total + (ic.base ? 0 : 5)]);
  }
  return scored.sort((a, b) => b[1] - a[1] || a[0].name.localeCompare(b[0].name)).map(([ic]) => ic);
}

/** The keyword that brought an icon into the results, or null when its name explains it. */
export function matchedKeyword(ic: Searchable, query: string) {
  for (const term of termsOf(query)) {
    if (forms(term).some((t) => nameScore(ic, t) > 0)) continue;
    for (const t of forms(term)) {
      const { text } = bestPhrase(ic, t);
      if (text) return text;
    }
  }
  return null;
}

export const pascal = (s: string) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());
export const camel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/**
 * Search for the grid, which shows base objects only. A badged icon that matches counts
 * for its base when the query also names the base ("folder plus" finds folder), so a
 * badge word alone ("lock") does not list every object that takes a lock badge.
 */
export function searchObjects(all: Searchable[], query: string, category = ""): Searchable[] {
  const inCat = (i: Searchable) => !category || i.category === category;
  const q = query.trim().toLowerCase();
  if (!q) return all.filter((i) => !i.base && inCat(i));
  const terms = termsOf(q);
  const byName = new Map(all.map((i) => [i.name, i]));
  const seen = new Set<string>();
  const out: Searchable[] = [];
  for (const hit of search(all.filter(inCat), q)) {
    let item = hit;
    if (hit.base) {
      const base = byName.get(hit.base);
      if (!base || !terms.some((t) => termScore(base, t, prefixFromFor(terms)) > 0 && !hit.badge?.includes(t))) continue;
      item = base;
    }
    if (!seen.has(item.name)) { seen.add(item.name); out.push(item); }
  }
  return out;
}
