"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItem } from "@/components/kit/styles";
import { Glide } from "@/components/kit/glide";
import { cn } from "@/lib/utils";
import { useLocalize, useTr } from "@/lib/use-locale";

export const DOCS = [
  { group: "Get started", zh: "入门", items: [
    { href: "/docs/", label: "Introduction", zh: "简介" },
  ] },
  { group: "Packages", zh: "软件包", items: [
    { href: "/docs/react/", label: "React", zh: "React" },
    { href: "/docs/vue/", label: "Vue", zh: "Vue" },
    { href: "/docs/javascript/", label: "JavaScript", zh: "JavaScript" },
    { href: "/docs/static/", label: "Static SVG", zh: "静态 SVG" },
  ] },
  { group: "Guides", zh: "指南", items: [
    { href: "/docs/customize/", label: "Customization", zh: "自定义" },
    { href: "/docs/performance/", label: "Performance", zh: "性能" },
    { href: "/docs/accessibility/", label: "Accessibility", zh: "无障碍" },
  ] },
  { group: "Contribute", zh: "参与贡献", items: [
    { href: "/docs/design/", label: "Design language", zh: "设计语言" },
    { href: "/docs/contributing/", label: "Contributing", zh: "贡献指南" },
    { href: "/skill/", label: "Kubai Icons skill", zh: "Kubai Icons Skill" },
  ] },
  { group: "Legal", zh: "法律信息", items: [
    { href: "/docs/analytics/", label: "Privacy", zh: "隐私" },
    { href: "/license/", label: "License", zh: "许可证" },
  ] },
];

export function DocsNav() {
  const path = usePathname();
  const tr = useTr();
  const loc = useLocalize();
  const norm = (p: string) => p.replace(/\/$/, "") || "/";
  return (
    <nav className="relative isolate -mx-gutter flex gap-1 overflow-x-auto px-gutter md:mx-0 md:block md:space-y-6 md:overflow-visible md:px-0">
      {DOCS.map((g) => (
        <div key={g.group} className="contents md:block md:space-y-1">
          <p className="hidden px-2.5 pb-1 text-control font-semibold text-foreground md:block">{tr(g.group, g.zh)}</p>
          {g.items.map((i) => (
            <Link
              key={i.href}
              href={loc(i.href)}
              aria-current={norm(path ?? "") === norm(loc(i.href)) ? "page" : undefined}
              className={cn(navItem({ active: norm(path ?? "") === norm(loc(i.href)) }), "w-auto shrink-0 whitespace-nowrap pointer-coarse:py-2.5 md:w-full")}
            >
              {tr(i.label, i.zh)}
            </Link>
          ))}
        </div>
      ))}
      <Glide selector="[aria-current=page]" className="rounded-control bg-muted" />
    </nav>
  );
}
