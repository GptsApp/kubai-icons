import type { Metadata } from "next";
import { IconBrowser } from "@/components/browser/icon-browser";
import { Container } from "@/components/kit/layout";
import { allCategories } from "@/lib/catalog";
import { localize, translated } from "@/lib/i18n";
import { pageLanguage } from "@/lib/page-language";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  return pageMeta({
    title: translated(locale, "Search animated SVG icons"),
    path: localize("/icons/", locale),
    description: translated(locale, "Search every Kubai icon by name, change its color and variant, and copy it for React, Vue or HTML, or download it as SVG or PNG."),
  });
}

export default async function IconsPage({ params }: Props) {
  const locale = await pageLanguage(params);
  return (
    <Container className="pt-8 lg:pt-stick">
      <h1 className="sr-only">{translated(locale, "Search animated SVG icons")}</h1>
      <IconBrowser categories={allCategories()} />
    </Container>
  );
}
