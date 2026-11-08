import Link from "next/link";
import { RiArrowRightSLine } from "@remixicon/react";
import { JsonLd } from "@/components/json-ld";
import { absolute } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** The trail to the current page, for readers and as structured data for search engines. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(c.path) })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-control text-muted-foreground">
          {trail.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <RiArrowRightSLine aria-hidden className="size-4" />}
              {i < trail.length - 1 ? <Link href={c.path} className="tap relative transition-colors hover:text-foreground">{c.name}</Link> : <span aria-current="page" className="text-foreground">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
