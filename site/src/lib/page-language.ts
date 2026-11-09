import { loadMessages, type Locale } from "./i18n";

/** The language of a page under /[lang]/, with its text ready to use. */
export async function pageLanguage(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  await loadMessages(lang as Locale);
  return lang as Locale;
}
