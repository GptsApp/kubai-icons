"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItem } from "@/components/kit/styles";
import { Glide } from "@/components/kit/glide";
import { cn } from "@/lib/utils";

export const DOCS = [
  { group: "Get started", items: [
    { href: "/docs/", label: "Introduction" },
  ] },
  { group: "Packages", items: [
    { href: "/docs/react/", label: "React" },
    { href: "/docs/vue/", label: "Vue" },
    { href: "/docs/javascript/", label: "JavaScript" },
    { href: "/docs/static/", label: "Static SVG" },
  ] },
  { group: "Guides", items: [
    { href: "/docs/customize/", label: "Customization" },
    { href: "/docs/performance/", label: "Performance" },
    { href: "/docs/accessibility/", label: "Accessibility" },
  ] },
  { group: "Contribute", items: [
    { href: "/docs/design/", label: "Design language" },
    { href: "/docs/contributing/", label: "Contributing" },
    { href: "/skill/", label: "Kubai Icons skill" },
  ] },
  { group: "Legal", items: [
    { href: "/docs/analytics/", label: "Privacy" },
    { href: "/license/", label: "License" },
  ] },
];

export function DocsNav() {
  const path = usePathname();
  const norm = (p: string) => p.replace(/\/$/, "") || "/";
  return (
    <nav className="relative isolate -mx-gutter flex gap-1 overflow-x-auto px-gutter md:mx-0 md:block md:space-y-6 md:overflow-visible md:px-0">
      {DOCS.map((g) => (
        <div key={g.group} className="contents md:block md:space-y-1">
          <p className="hidden px-2.5 pb-1 text-caption md:block font-medium text-muted-foreground">{g.group}</p>
          {g.items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              aria-current={norm(path ?? "") === norm(i.href) ? "page" : undefined}
              className={cn(navItem({ active: norm(path ?? "") === norm(i.href) }), "w-auto shrink-0 whitespace-nowrap pointer-coarse:py-2.5 md:w-full")}
            >
              {i.label}
            </Link>
          ))}
        </div>
      ))}
      <Glide selector="[aria-current=page]" className="rounded-control bg-muted" />
    </nav>
  );
}
