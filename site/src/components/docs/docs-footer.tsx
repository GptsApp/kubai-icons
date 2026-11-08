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

const PAGES = DOCS.flatMap((group) => group.items);
const HOME = { href: "/", label: "Kubai Icons" };
const norm = (p: string) => p.replace(/\/$/, "") || "/";
const action = cn(buttonVariants({ variant: "outline", size: "sm" }));
const pagerLink = "tap relative grid gap-0.5 rounded-card border px-4 py-3 transition-colors hover:bg-muted/50";

/** Closes every article: where to ask for help, then the pages on either side of this one. */
export function DocsFooter() {
  const path = norm(usePathname() ?? "");
  const index = PAGES.findIndex((p) => norm(p.href) === path);
  if (index < 0) return null;
  const previous = PAGES[index - 1] ?? HOME;
  const next = PAGES[index + 1];
  return (
    <div className="mt-12 max-w-3xl space-y-3">
      {path === "/skill" ? null : <SkillPrompt />}
      <aside className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-card border px-5 py-4">
        <p className="text-body">Found a problem, or need a component that isn&apos;t here?</p>
        <div className="flex flex-wrap gap-2">
          <FeedbackLink className={action}><RiGithubLine data-icon="inline-start" />Open an issue</FeedbackLink>
          <AuthorLink place="docs_footer" className={action}><RiTwitterXLine data-icon="inline-start" />Message on X</AuthorLink>
        </div>
      </aside>
      <nav aria-label="Previous and next pages" className="grid grid-cols-2 gap-3 pt-3">
        <Link href={previous.href} className={pagerLink}>
          <span className="text-caption text-muted-foreground">{previous === HOME ? "Home" : "Previous"}</span>
          <span className="font-medium">{previous.label}</span>
        </Link>
        {next ? (
          <Link href={next.href} className={cn(pagerLink, "col-start-2 text-right")}>
            <span className="text-caption text-muted-foreground">Next</span>
            <span className="font-medium">{next.label}</span>
          </Link>
        ) : null}
      </nav>
      <p className="pt-3 text-caption text-muted-foreground">
        Kubai Icons is free to use. <Link href="/sponsor/" className="tap relative font-medium text-foreground underline-offset-4 hover:underline">Sponsor the project</Link>
      </p>
    </div>
  );
}
