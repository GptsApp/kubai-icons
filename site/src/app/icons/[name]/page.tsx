import type { Metadata } from "next";
import { IconPageBody, iconPageMeta } from "@/components/icon-page";
import { baseIcons } from "@/lib/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => baseIcons().map((i) => ({ name: i.name }));

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  return iconPageMeta(name, "en");
}

export default async function IconPage({ params }: Props) {
  const { name } = await params;
  return <IconPageBody name={name} locale="en" />;
}
