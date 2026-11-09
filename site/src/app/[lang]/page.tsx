import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { localize, translated } from "@/lib/i18n";
import { pageLanguage } from "@/lib/page-language";
import { HOME_DESCRIPTION, HOME_TITLE, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  return pageMeta({ fullTitle: translated(locale, HOME_TITLE), path: localize("/", locale), description: translated(locale, HOME_DESCRIPTION) });
}

export default async function Home({ params }: Props) {
  return <HomePage locale={await pageLanguage(params)} />;
}
