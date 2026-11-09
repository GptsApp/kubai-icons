import type { Metadata } from "next";
import { CategoryPageBody, categoryMeta } from "@/components/category-page";
import { allCategories } from "@/lib/catalog";
import { pageLanguage } from "@/lib/page-language";

export const dynamicParams = false;
export const generateStaticParams = () => allCategories().map((c) => ({ id: c.id }));

type Props = { params: Promise<{ lang: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  return categoryMeta((await params).id, locale);
}

export default async function CategoryPage({ params }: Props) {
  const locale = await pageLanguage(params);
  return <CategoryPageBody id={(await params).id} locale={locale} />;
}
