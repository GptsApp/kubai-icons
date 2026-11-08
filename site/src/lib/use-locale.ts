"use client";
import { usePathname } from "next/navigation";
import { localeOf, localize, pick } from "./i18n";

/** The language of the current page. */
export const useLocale = () => localeOf(usePathname());

/** Chooses between an English and a Chinese string for the current page. */
export function useTr() {
  const locale = useLocale();
  return <T,>(en: T, zh: T) => pick(locale, en, zh);
}

/** Turns an English site path into the current page's language. */
export function useLocalize() {
  const locale = useLocale();
  return (path: string) => localize(path, locale);
}
