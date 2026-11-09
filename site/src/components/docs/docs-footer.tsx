"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGithubLine, RiTwitterXLine } from "@remixicon/react";
import { AuthorLink } from "@/components/author-link";
import { DOCS } from "@/components/docs/docs-nav";
import { FeedbackLink } from "@/components/feedback-link";
import { SkillPrompt } from "@/components/skill-prompt";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localize } from "@/lib/i18n";
import { useLocalize, useTr } from "@/lib/use-locale";

const PAGES = DOCS.flatMap((group) => group.items);
const HOME = { href: "/", label: "Kubai Icons", zh: "Kubai Icons" };
const norm = (p: string) => p.replace(/\/$/, "") || "/";
const action = cn(buttonVariants({ variant: "outline", size: "sm" }));
const pagerLink = "tap relative grid gap-0.5 rounded-card border px-4 py-3 transition-colors hover:bg-muted/50";

/** Closes every article: where to ask for help, then the pages on either side of this one. */
export function DocsFooter() {
  const tr = useTr();
  const loc = useLocalize();
  const path = norm(localize(usePathname() ?? "/", "en"));
  const index = PAGES.findIndex((p) => norm(p.href) === path);
  if (index < 0) return null;
  const previous = PAGES[index - 1] ?? HOME;
  const next = PAGES[index + 1];
  return (
    <div className="mt-12 max-w-3xl space-y-3">
      {path === "/skill" ? null : <SkillPrompt />}
      <aside className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-card border px-5 py-4">
        <p className="text-body">{tr("Found a problem, or need an icon that isn’t here?", "发现问题，或没有找到需要的图标？")}</p>
        <div className="flex flex-wrap gap-2">
          <FeedbackLink className={action}><RiGithubLine data-icon="inline-start" />{tr("Open an issue", "提交 Issue")}</FeedbackLink>
          <AuthorLink place="docs_footer" className={action}><RiTwitterXLine data-icon="inline-start" />{tr("Message on X", "在 X 上联系")}</AuthorLink>
        </div>
      </aside>
      <nav aria-label={tr("Previous and next pages", "上一页和下一页")} className="grid grid-cols-2 gap-3 pt-3">
        <Link href={loc(previous.href)} className={pagerLink}>
          <span className="text-caption text-muted-foreground">{previous === HOME ? tr("Home", "首页") : tr("Previous", "上一页")}</span>
          <span className="font-medium">{tr(previous.label, previous.zh)}</span>
        </Link>
        {next ? (
          <Link href={loc(next.href)} className={cn(pagerLink, "col-start-2 text-end")}>
            <span className="text-caption text-muted-foreground">{tr("Next", "下一页")}</span>
            <span className="font-medium">{tr(next.label, next.zh)}</span>
          </Link>
        ) : null}
      </nav>
      <p className="pt-3 text-caption text-muted-foreground">
        {tr("Kubai Icons is free to use.", "Kubai Icons 免费使用。")} <Link href={loc("/sponsor/")} className="tap relative font-medium text-foreground underline-offset-4 hover:underline">{tr("Sponsor the project", "赞助本项目")}</Link>
      </p>
    </div>
  );
}
