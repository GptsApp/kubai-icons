import type { Metadata } from "next";
import { SITE_URL } from "./site";

export const SITE_NAME = "Kubai Icons";
export const HOME_TITLE = "Kubai Icons: animated open-source icons for React, Vue and SVG";
export const HOME_DESCRIPTION = "Open-source layered icons with hover motion for React, Vue, web components and static SVG. Folders open, bells ring and locks unlock.";
/** The full address of a page, given its path with the trailing slash. */
export const absolute = (path: string) => `${SITE_URL}${path}`;

const IMAGE = { url: absolute("/assets/og.png"), width: 1200, height: 630, alt: "Kubai Icons: animated open-source icons for React, Vue and the web" };

/** Title, description, canonical address and social cards for one page. */
export function pageMeta({ title, description, path, fullTitle }: { title?: string; description: string; path: string; fullTitle?: string }): Metadata {
  const shown = fullTitle ?? `${title} – ${SITE_NAME}`;
  const url = absolute(path);
  return {
    title: fullTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: SITE_NAME, title: shown, description, url, images: [IMAGE] },
    twitter: { card: "summary_large_image", title: shown, description, images: [IMAGE.url] },
  };
}

/** "arrow-left-right" as readers would write it: "Arrow left right". */
export const iconLabel = (name: string) => {
  const words = name.replace(/-/g, " ");
  return words[0].toUpperCase() + words.slice(1);
};
