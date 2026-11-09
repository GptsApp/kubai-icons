import type { Metadata } from "next";
import { IconBrowser } from "@/components/browser/icon-browser";
import { Container } from "@/components/kit/layout";
import { allCategories, firstChunk } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Search animated SVG icons",
  path: "/icons/",
  description: "Search every Kubai icon by name, change its color and variant, and copy it for React, Vue or HTML, or download it as SVG or PNG.",
});

export default function IconsPage() {
  return (
    <Container className="pt-8 lg:pt-stick">
      <h1 className="sr-only">Search animated SVG icons</h1>
      <IconBrowser categories={allCategories()} firstChunk={firstChunk()} />
    </Container>
  );
}
