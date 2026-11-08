import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/kit/layout";
import { IconLinks } from "@/components/browser/icon-links";
import { IconPageView } from "@/components/browser/icon-page-view";
import { allCategories, familyOf, iconByName, relatedTo, zhNameOf, zhWords } from "@/lib/catalog";
import { localize, pick, type Locale } from "@/lib/i18n";
import { absolute, iconLabel, pageMeta, SITE_NAME } from "@/lib/seo";
import { REPO, reportIconUrl } from "@/lib/site";

/** An icon's name for readers in a language. */
const titleOf = (name: string, locale: Locale) => pick(locale, iconLabel(name), zhWords(name)[0] ?? iconLabel(name));

export function iconPageMeta(name: string, locale: Locale): Metadata {
  const meta = iconByName(name);
  if (!meta) return {};
  const label = titleOf(name, locale);
  const path = localize(`/icons/${name}/`, locale);
  if (locale === "zh") {
    return pageMeta({ title: `${label}图标`, path, description: `开源的动态图标“${label}”（${name}），带悬停动效。提供 React、Vue 组件和 Web Component，也可下载为 SVG 或 PNG。` });
  }
  const tags = meta.tags.slice(0, 3).join(", ");
  return pageMeta({
    title: `${label} icon`,
    path,
    description: `Animated ${label.toLowerCase()} icon${tags ? ` (${tags})` : ""} with hover motion. Copy it for React, Vue or HTML, or download it as SVG or PNG.`,
  });
}

/** One icon's page, in either language. */
export function IconPageBody({ name, locale }: { name: string; locale: Locale }) {
  const meta = iconByName(name);
  if (!meta) notFound();
  const label = titleOf(name, locale);
  const categories = allCategories();
  const category = categories.find((c) => c.id === meta.category);
  const categoryName = category ? pick(locale, category.en, category.zh ?? category.en) : undefined;
  const family = familyOf(name);
  const badged = family.filter((i) => i.base).map((i) => pick(locale, i.name, zhNameOf(i) ?? i.name));
  const related = relatedTo(meta);
  const terms = pick(locale, meta.tags, zhWords(name));
  return (
    <Container className="space-y-8 pt-8 pb-section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          name: pick(locale, `${label} icon`, `${label}图标`),
          contentUrl: absolute(`/icons/${name}/preview.svg`),
          encodingFormat: "image/svg+xml",
          creditText: SITE_NAME,
          creator: { "@type": "Person", name: "Kubai087", url: "https://github.com/kubai087" },
          license: `${REPO}/blob/master/LICENSE-ICONS`,
          acquireLicensePage: absolute(localize("/license/", locale)),
        }}
      />
      <Breadcrumbs
        trail={[
          { name: pick(locale, "Icons", "图标"), path: localize("/icons/", locale) },
          ...(category ? [{ name: categoryName!, path: localize(`/icons/category/${category.id}/`, locale) }] : []),
          { name: label, path: localize(`/icons/${name}/`, locale) },
        ]}
      />
      <IconPageView meta={meta} related={family} categories={categories} heading={pick(locale, `${label} icon`, `${label}图标`)} />
      <section className="max-w-3xl space-y-3 text-body text-muted-foreground">
        <p>
          {pick(
            locale,
            `${label} is an open-source animated icon${categoryName ? ` from the ${categoryName} set` : ""}. It plays its hover motion as a React or Vue component or a web component, and is also available as a static SVG.`,
            `“${label}”是一款开源的动态图标${categoryName ? `，属于“${categoryName}”分类` : ""}。它可以作为 React、Vue 组件或 Web Component 播放悬停动效，也提供静态 SVG。`,
          )}
        </p>
        {terms.length > 0 && <p>{pick(locale, `Related terms: ${terms.join(", ")}.`, `相关词：${terms.join("、")}`)}</p>}
        {badged.length > 0 && <p>{pick(locale, `Badged versions: ${badged.join(", ")}.`, `带角标的版本：${badged.join("、")}`)}</p>}
        <p><a href={reportIconUrl(name)} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-foreground">{pick(locale, "Report a problem with this icon", "报告此图标的问题")}</a></p>
      </section>
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-heading font-semibold">{pick(locale, "Related icons", "相关图标")}</h2>
          <IconLinks icons={related} locale={locale} />
        </section>
      )}
    </Container>
  );
}
