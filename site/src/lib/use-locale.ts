"use client";
import { use } from "react";
import { usePathname } from "next/navigation";
import { loadMessages, localeOf, localize, messagesReady, pick, type Locale } from "./i18n";

/** The language of the current page. */
export const useLocale = () => localeOf(usePathname());

/** Waits for a language's text, holding the page as it is until it arrives. */
function useMessages(locale: Locale) {
  if (!messagesReady(locale)) use(loadMessages(locale));
}

/** Chooses the text for the current page, from its English and Simplified Chinese. */
export function useTr() {
  const locale = useLocale();
  useMessages(locale);
  return <T,>(en: T, zh: T, vars?: Record<string, string | number>) => pick(locale, en, zh, vars);
}

/** Turns an English site path into the current page's language. */
export function useLocalize() {
  const locale = useLocale();
  return (path: string) => localize(path, locale);
}
