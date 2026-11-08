import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/kit/layout";
import { IconLinks } from "@/components/browser/icon-links";
import { IconPageView } from "@/components/browser/icon-page-view";
import { allCategories, baseIcons, familyOf, iconByName, relatedTo } from "@/lib/catalog";
import { absolute, iconLabel, pageMeta, SITE_NAME } from "@/lib/seo";
import { REPO, reportIconUrl } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => baseIcons().map((i) => ({ name: i.name }));

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const meta = iconByName(name);
  if (!meta) return {};
  const label = iconLabel(name);
  const tags = meta.tags.slice(0, 3).join(", ");
  return pageMeta({
    title: `${label} icon`,
    path: `/icons/${name}/`,
    description: `Animated ${label.toLowerCase()} icon${tags ? ` (${tags})` : ""} with hover motion. Copy it for React, Vue or HTML, or download it as SVG or PNG.`,
  });
}

export default async function IconPage({ params }: Props) {
  const { name } = await params;
  const meta = iconByName(name);
  if (!meta) notFound();
  const label = iconLabel(name);
  const categories = allCategories();
  const category = categories.find((c) => c.id === meta.category);
  const family = familyOf(name);
  const badged = family.filter((i) => i.base).map((i) => i.name);
  const related = relatedTo(meta);
  return (
    <Container className="space-y-8 pt-8 pb-section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          name: `${label} icon`,
          contentUrl: absolute(`/icons/${name}/preview.svg`),
          encodingFormat: "image/svg+xml",
          creditText: SITE_NAME,
          creator: { "@type": "Person", name: "Kubai087", url: "https://github.com/kubai087" },
          license: `${REPO}/blob/master/LICENSE-ICONS`,
          acquireLicensePage: absolute("/license/"),
        }}
      />
      <Breadcrumbs
        trail={[
          { name: "Icons", path: "/icons/" },
          ...(category ? [{ name: category.en, path: `/icons/category/${category.id}/` }] : []),
          { name: label, path: `/icons/${name}/` },
        ]}
      />
      <IconPageView meta={meta} related={family} categories={categories} />
      <section className="max-w-3xl space-y-3 text-body text-muted-foreground">
        <p>
          {label} is an open-source animated icon{category ? ` from the ${category.en} set` : ""}. It plays its hover motion as a React or Vue component or a web component, and is also available as a static SVG.
        </p>
        {meta.tags.length > 0 && <p>Related terms: {meta.tags.join(", ")}.</p>}
        {badged.length > 0 && <p>Badged versions: {badged.join(", ")}.</p>}
        <p><a href={reportIconUrl(name)} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-foreground">Report a problem with this icon</a></p>
      </section>
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-heading font-semibold">Related icons</h2>
          <IconLinks icons={related} />
        </section>
      )}
    </Container>
  );
}
