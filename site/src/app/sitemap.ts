import type { MetadataRoute } from "next";
import { allCategories, baseIcons } from "@/lib/catalog";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

const PAGES = ["/", "/icons/", "/icons/submit/", "/docs/", "/docs/react/", "/docs/vue/", "/docs/javascript/", "/docs/static/", "/docs/customize/", "/docs/design/", "/docs/accessibility/", "/docs/performance/", "/docs/analytics/", "/docs/contributing/", "/skill/", "/sponsor/", "/license/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: absolute(p) })),
    ...allCategories().map((c) => ({ url: absolute(`/icons/category/${c.id}/`) })),
    ...baseIcons().map((i) => ({ url: absolute(`/icons/${i.name}/`), images: [absolute(`/icons/${i.name}/preview.svg`)] })),
  ];
}
