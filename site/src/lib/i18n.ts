// Language handling. English lives at the site root and every other language under its own
// prefix, so each language has its own addresses. Simplified Chinese keeps its text beside the
// English in the code; the other languages look the English up in their files in src/i18n.
// Every function here is safe on the server.
import languages from "./languages.json";
import { BASE } from "./site";

export type Locale = "en" | "zh" | "zh-hant" | "es" | "pt" | "fr" | "de" | "it" | "ru" | "tr" | "ar" | "hi" | "id" | "vi" | "ja" | "ko";
export type Language = { code: Locale; name: string; tag: string; og: string; dir?: string };
export type Messages = Record<string, string>;
type Vars = Record<string, string | number>;

export const LANGUAGES = languages as Language[];
const BY_CODE = new Map(LANGUAGES.map((l) => [l.code as string, l]));
/** The languages whose text comes from src/i18n. */
export const CATALOG_LOCALES = LANGUAGES.map((l) => l.code).filter((c) => c !== "en" && c !== "zh");

export const languageOf = (locale: Locale) => BY_CODE.get(locale)!;
/** Only English and Simplified Chinese have a page per icon. Elsewhere an icon opens in the browser. */
export const hasIconPages = (locale: Locale) => locale === "en" || locale === "zh";

const ICON_PAGE = /^\/icons\/(?!submit\/)([^/?#]+)\/$/;
/** True for the address of one icon's own page. */
export const isIconPage = (path: string) => ICON_PAGE.test(path);

/** The language of a path. */
export function localeOf(path: string | null | undefined): Locale {
  const first = path?.split("/")[1];
  return first && first !== "en" && BY_CODE.has(first) ? (first as Locale) : "en";
}

/** The same page in a language. Paths outside the site, such as full URLs, are not expected here. */
export function localize(path: string, locale: Locale) {
  const from = localeOf(path);
  const bare = from === "en" ? path : path.slice(from.length + 1) || "/";
  if (locale === "en") return bare;
  const icon = hasIconPages(locale) ? null : bare.match(ICON_PAGE);
  return icon ? `/${locale}/icons/?icon=${icon[1]}` : `/${locale}${bare}`;
}

const LOADERS: Record<string, () => Promise<{ default: Messages }>> = {
  "zh-hant": () => import("@/i18n/zh-hant/ui.json"),
  "es": () => import("@/i18n/es/ui.json"),
  "pt": () => import("@/i18n/pt/ui.json"),
  "fr": () => import("@/i18n/fr/ui.json"),
  "de": () => import("@/i18n/de/ui.json"),
  "it": () => import("@/i18n/it/ui.json"),
  "ru": () => import("@/i18n/ru/ui.json"),
  "tr": () => import("@/i18n/tr/ui.json"),
  "ar": () => import("@/i18n/ar/ui.json"),
  "hi": () => import("@/i18n/hi/ui.json"),
  "id": () => import("@/i18n/id/ui.json"),
  "vi": () => import("@/i18n/vi/ui.json"),
  "ja": () => import("@/i18n/ja/ui.json"),
  "ko": () => import("@/i18n/ko/ui.json"),
};
const loaded = new Map<Locale, Messages>();
const loading = new Map<Locale, Promise<Messages>>();

/** The language's text if it has arrived, or nothing to wait for when it needs none. */
export const messagesReady = (locale: Locale) => !LOADERS[locale] || loaded.has(locale);

/** Fetches a language's text once. Afterwards `pick` can use it. */
export function loadMessages(locale: Locale): Promise<Messages> {
  const load = LOADERS[locale];
  if (!load) return Promise.resolve({});
  let promise = loading.get(locale);
  if (!promise) {
    promise = load().then(({ default: messages }) => {
      loaded.set(locale, messages);
      return messages;
    });
    loading.set(locale, promise);
  }
  return promise;
}

const fill = (text: string, vars: Vars) => text.replace(/\{(\w+)\}/g, (all, key) => (key in vars ? String(vars[key]) : all));

/**
 * The text for a language. English first, so the original stays readable beside its
 * translation. Text may hold {placeholders} for `vars`. A language without a translation
 * shows the English.
 */
export function pick<T>(locale: Locale, en: T, zh: T, vars?: Vars): T {
  const chosen = locale === "zh" ? zh : typeof en === "string" && locale !== "en" ? (loaded.get(locale)?.[en] ?? en) : en;
  return (vars && typeof chosen === "string" ? fill(chosen, vars) : chosen) as T;
}

/** Text with no Simplified Chinese beside it in the code. */
export const translated = (locale: Locale, en: string, vars?: Vars) => pick(locale, en, en, vars);

/** Marks English text defined away from where it is translated, so the text check finds it. */
export const msg = (en: string) => en;

/** The language of the page being viewed, for code outside React. */
export const browserLocale = (): Locale =>
  typeof window === "undefined" ? "en" : localeOf(window.location.pathname.slice(BASE.length));
