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
import { localize, pick, type Locale } from "@/lib/i18n";
import { absolute, pageMeta } from "@/lib/seo";

const nameIn = (c: { en: string; zh?: string }, locale: Locale) => pick(locale, c.en, c.zh ?? c.en);
const leadFor = (count: number, name: string, locale: Locale) =>
  pick(
    locale,
    "{count} open-source animated {lower} icons for React, Vue and the web, each with its own hover motion and available as static SVG.",
    "“{name}”分类共有 {count} 个开源图标，提供 React、Vue 组件、Web Component 和静态 SVG，每个图标都有各自的悬停动效。",
    { count, name, lower: name.toLowerCase() },
  );
const titleFor = (name: string, locale: Locale) => pick(locale, "{name} icons", "{name}图标", { name });
// Shown under the title, so unlike the search description it leaves out the category name.
const visibleLead = (count: number, locale: Locale) =>
  pick(
    locale,
    "{count} open-source animated icons for React, Vue and the web, each with its own hover motion and available as static SVG.",
    "共 {count} 个开源图标，提供 React、Vue 组件、Web Component 和静态 SVG，每个图标都有各自的悬停动效",
    { count },
  );

export function categoryMeta(id: string, locale: Locale): Metadata {
  const category = categoryById(id);
  if (!category) return {};
  const name = nameIn(category, locale);
  return pageMeta({ title: titleFor(name, locale), path: localize(`/icons/category/${id}/`, locale), description: leadFor(iconsIn(id).length, name, locale) });
}

/** One category's page, in any language. */
export function CategoryPageBody({ id, locale }: { id: string; locale: Locale }) {
  const category = categoryById(id);
  if (!category) notFound();
  const icons = iconsIn(id);
  const name = nameIn(category, locale);
  return (
    <Container className="space-y-8 pt-8 pb-section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: titleFor(name, locale),
          url: absolute(localize(`/icons/category/${id}/`, locale)),
          mainEntity: { "@type": "ItemList", numberOfItems: icons.length, itemListElement: icons.map((i, n) => ({ "@type": "ListItem", position: n + 1, url: absolute(localize(`/icons/${i.name}/`, locale)) })) },
        }}
      />
      <Breadcrumbs trail={[{ name: pick(locale, "Icons", "图标"), path: localize("/icons/", locale) }, { name, path: localize(`/icons/category/${id}/`, locale) }]} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading level={1} title={titleFor(name, locale)} lead={visibleLead(icons.length, locale)} />
        <Button variant="outline" render={<Link href={localize(`/icons/?category=${id}`, locale)} prefetch={false} />}>{pick(locale, "Search and recolor", "在图标库中查看")}</Button>
      </div>
      <IconLinks icons={icons} locale={locale} />
      <nav aria-label={pick(locale, "Icon categories", "图标分类")} className="flex flex-wrap gap-1.5">
        {allCategories().map((c) => (
          <Link key={c.id} href={localize(`/icons/category/${c.id}/`, locale)} prefetch={false} aria-current={c.id === id ? "page" : undefined} className={chip({ active: c.id === id })}>{nameIn(c, locale)}</Link>
        ))}
      </nav>
    </Container>
  );
}
