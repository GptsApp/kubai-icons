import type { MetadataRoute } from "next";
import { allCategories, baseIcons } from "@/lib/catalog";
import { absolute } from "@/lib/seo";
import { hasIconPages, LANGUAGES, localize } from "@/lib/i18n";

export const dynamic = "force-static";

const PAGES = ["/", "/icons/", "/icons/submit/", "/docs/", "/docs/react/", "/docs/vue/", "/docs/javascript/", "/docs/static/", "/docs/customize/", "/docs/design/", "/docs/accessibility/", "/docs/performance/", "/docs/analytics/", "/docs/contributing/", "/skill/", "/sponsor/", "/license/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.map((l) => l.code).flatMap((locale) => [
    ...PAGES.map((p) => ({ url: absolute(localize(p, locale)) })),
    ...allCategories().map((c) => ({ url: absolute(localize(`/icons/category/${c.id}/`, locale)) })),
    ...(hasIconPages(locale) ? baseIcons() : []).map((i) => ({ url: absolute(localize(`/icons/${i.name}/`, locale)), images: [absolute(`/icons/${i.name}/preview.svg`)] })),
  ]);
}
