import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Container, Heading } from "@/components/kit/layout";
import { chip } from "@/components/kit/styles";
import { IconLinks } from "@/components/browser/icon-links";
import { allCategories, categoryById, iconsIn } from "@/lib/catalog";
import { absolute, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => allCategories().map((c) => ({ id: c.id }));

type Props = { params: Promise<{ id: string }> };

const leadFor = (count: number, name: string) =>
  `${count} open-source animated ${name.toLowerCase()} icons for React, Vue and the web, each with its own hover motion and available as static SVG.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = categoryById(id);
  if (!category) return {};
  return pageMeta({ title: `${category.en} icons`, path: `/icons/category/${id}/`, description: leadFor(iconsIn(id).length, category.en) });
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const category = categoryById(id);
  if (!category) notFound();
  const icons = iconsIn(id);
  return (
    <Container className="space-y-8 pt-8 pb-section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.en} icons`,
          url: absolute(`/icons/category/${id}/`),
          mainEntity: { "@type": "ItemList", numberOfItems: icons.length, itemListElement: icons.map((i, n) => ({ "@type": "ListItem", position: n + 1, url: absolute(`/icons/${i.name}/`) })) },
        }}
      />
      <Breadcrumbs trail={[{ name: "Icons", path: "/icons/" }, { name: category.en, path: `/icons/category/${id}/` }]} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading level={1} title={`${category.en} icons`} lead={leadFor(icons.length, category.en)} />
        <Button variant="outline" render={<Link href={`/icons/?category=${id}`} prefetch={false} />}>Search and recolour</Button>
      </div>
      <IconLinks icons={icons} />
      <nav aria-label="Icon categories" className="flex flex-wrap gap-1.5">
        {allCategories().map((c) => (
          <Link key={c.id} href={`/icons/category/${c.id}/`} prefetch={false} aria-current={c.id === id ? "page" : undefined} className={chip({ active: c.id === id })}>{c.en}</Link>
        ))}
      </nav>
    </Container>
  );
}
