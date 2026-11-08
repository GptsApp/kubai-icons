import type { Metadata } from "next";
import { IconBrowser } from "@/components/browser/icon-browser";
import { Container } from "@/components/kit/layout";
import { allCategories } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "搜索动态 SVG 图标",
  path: "/zh/icons/",
  description: "按名称、形状或含义搜索全部 Kubai 图标，调整颜色和样式，复制 React、Vue 或 HTML 代码，或下载为 SVG 和 PNG。",
});

export default function IconsPage() {
  return (
    <Container className="pt-8 lg:pt-stick">
      <h1 className="sr-only">搜索动态 SVG 图标</h1>
      <IconBrowser categories={allCategories()} />
    </Container>
  );
}
