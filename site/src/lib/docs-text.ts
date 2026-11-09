// The documentation's translations, read only while the pages are built.
import type { Locale, Messages } from "./i18n";

const LOADERS: Record<string, () => Promise<{ default: Messages }>> = {
  "zh-hant": () => import("@/i18n/zh-hant/docs.json"),
  "es": () => import("@/i18n/es/docs.json"),
  "pt": () => import("@/i18n/pt/docs.json"),
  "fr": () => import("@/i18n/fr/docs.json"),
  "de": () => import("@/i18n/de/docs.json"),
  "it": () => import("@/i18n/it/docs.json"),
  "ru": () => import("@/i18n/ru/docs.json"),
  "tr": () => import("@/i18n/tr/docs.json"),
  "ar": () => import("@/i18n/ar/docs.json"),
  "hi": () => import("@/i18n/hi/docs.json"),
  "id": () => import("@/i18n/id/docs.json"),
  "vi": () => import("@/i18n/vi/docs.json"),
  "ja": () => import("@/i18n/ja/docs.json"),
  "ko": () => import("@/i18n/ko/docs.json"),
};

/** A language's documentation text, by its English source. */
export const loadDocsText = async (locale: Locale): Promise<Messages> => (await LOADERS[locale]?.())?.default ?? {};
