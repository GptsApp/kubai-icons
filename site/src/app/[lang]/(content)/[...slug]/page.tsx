import type { Metadata } from "next";
import { CONTENT_PAGES } from "@/lib/content-pages";
import { loadDocsText } from "@/lib/docs-text";
import { localize } from "@/lib/i18n";
import { pageLanguage } from "@/lib/page-language";
import { pageMeta } from "@/lib/seo";
import { translateTree } from "@/lib/translate-tree";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(CONTENT_PAGES).map((key) => ({ slug: key.split("/") }));

type Props = { params: Promise<{ lang: string; slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  const { slug } = await params;
  const { metadata } = CONTENT_PAGES[slug.join("/")];
  const text = await loadDocsText(locale);
  const say = (english: string) => text[english] ?? english;
  return pageMeta({ title: say(String(metadata.title)), path: localize(`/${slug.join("/")}/`, locale), description: say(String(metadata.description)) });
}

export default async function ContentPage({ params }: Props) {
  const locale = await pageLanguage(params);
  const { slug } = await params;
  const text = await loadDocsText(locale);
  const Page = CONTENT_PAGES[slug.join("/")].default;
  return translateTree(Page(), (english) => text[english] ?? english, (path) => localize(path, locale));
}
