import type { Metadata } from "next";
import { CategoryPageBody, categoryMeta } from "@/components/category-page";
import { allCategories } from "@/lib/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => allCategories().map((c) => ({ id: c.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return categoryMeta(id, "en");
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  return <CategoryPageBody id={id} locale="en" />;
}
