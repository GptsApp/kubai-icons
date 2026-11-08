// Language handling. English lives at the site root and Simplified Chinese under /zh/, so
// each language has its own addresses. Every function here is safe on the server.
import { BASE } from "./site";

export type Locale = "en" | "zh";

const PREFIX = "/zh";

/** The language of a path. */
export const localeOf = (path: string | null | undefined): Locale =>
  path === PREFIX || path?.startsWith(`${PREFIX}/`) ? "zh" : "en";

/** The same page in a language. Paths outside the site, such as full URLs, are not expected here. */
export function localize(path: string, locale: Locale) {
  const bare = localeOf(path) === "zh" ? path.slice(PREFIX.length) || "/" : path;
  return locale === "zh" ? `${PREFIX}${bare}` : bare;
}

/** The text for a language. English first, so the original stays readable beside its translation. */
export const pick = <T,>(locale: Locale, en: T, zh: T) => (locale === "zh" ? zh : en);

/** The language of the page being viewed, for code outside React. */
export const browserLocale = (): Locale =>
  typeof window === "undefined" ? "en" : localeOf(window.location.pathname.slice(BASE.length));
