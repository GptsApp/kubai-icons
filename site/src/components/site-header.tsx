"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FeedbackLink } from "./feedback-link";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { Container } from "./kit/layout";
import { quietLink } from "./kit/styles";
import { GitHubStars } from "./github-stars";
import { AuthorLink } from "./author-link";
import { HeaderMenu } from "./header-menu";
import { RiTwitterXLine } from "@remixicon/react";
import { MessageCircle } from "kubai-icons-react";
import { Glide } from "./kit/glide";
import { DocumentLanguage, LanguageSwitch } from "./language-switch";
import { localize } from "@/lib/i18n";
import { useLocalize, useTr } from "@/lib/use-locale";
import { cn } from "@/lib/utils";

// Links marked `wide` sit in the bar from the lg breakpoint; below it they are in HeaderMenu.
const NAV = [
  { href: "/icons/", label: "Icons", zh: "图标" },
  { href: "/docs/", label: "Docs", zh: "文档" },
  { href: "/skill/", label: "Skill", zh: "Skill" },
  { href: "/icons/submit/", label: "Submit", zh: "提交", wide: true },
  { href: "/sponsor/", label: "Sponsor", zh: "赞助", wide: true },
];

/** The nav entry for a path: the most specific one, so /icons/submit/ is not also Icons. */
const currentHref = (path: string | null) => {
  const here = `${localize(path ?? "/", "en")}/`.replace(/\/+$/, "/");
  return NAV.filter((n) => here.startsWith(n.href)).sort((a, b) => b.href.length - a.href.length)[0]?.href;
};

export function SiteHeader() {
  const current = currentHref(usePathname());
  const tr = useTr();
  const loc = useLocalize();
  return (
    <>
    <DocumentLanguage />
    <header data-site-header className="header-rule sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-[calc(var(--header)-1px)] items-center gap-3 sm:gap-6">
        <Link href={loc("/")} className="tap relative flex shrink-0 items-center gap-2 text-subheading font-semibold whitespace-nowrap" aria-label="Kubai Icons">
          <Logo size={24} />
          <span className="hidden sm:inline">Kubai Icons</span>
          <span className="hidden rounded-pill bg-muted px-1.5 text-caption font-medium text-muted-foreground sm:inline">beta</span>
        </Link>
        <nav className="relative isolate flex min-w-0 items-center gap-0.5 overflow-x-auto text-control pointer-coarse:py-1.5 sm:gap-1">
          <Glide still selector="[aria-current=page]" className="rounded-control bg-muted" />
          {NAV.map((n) => {
            const active = n.href === current;
            return (
              <Link
                key={n.href}
                href={loc(n.href)}
                aria-current={active ? "page" : undefined}
                className={cn("focus-inset tap relative rounded-control px-2 py-1.5 whitespace-nowrap sm:px-2.5", n.wide && "hidden lg:block", quietLink, active && "text-foreground")}
              >
                {tr(n.label, n.zh)}
              </Link>
            );
          })}
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <FeedbackLink label={tr("Feedback", "反馈")} className={cn("tap relative hidden h-8 items-center justify-center gap-1.5 rounded-control pe-2.5 ps-2 text-control hover:bg-muted lg:flex", quietLink)}>
            <MessageCircle size={18} color="#5393FF" trigger="parent" />
            <span>{tr("Feedback", "反馈")}</span>
          </FeedbackLink>
          <AuthorLink place="header" label={tr("Kubai087 on X", "Kubai087 的 X 主页")} className={cn("tap relative hidden size-8 place-items-center rounded-control hover:bg-muted lg:grid", quietLink)}>
            <RiTwitterXLine className="size-4" />
          </AuthorLink>
          <LanguageSwitch className={cn("tap relative grid size-8 place-items-center rounded-control hover:bg-muted", quietLink)} iconOnly />
          <ThemeToggle className="max-lg:hidden" />
          <GitHubStars className="ms-1 hidden min-[360px]:inline-flex" />
          <HeaderMenu className="ms-1 lg:hidden" />
        </div>
      </Container>
    </header>
    </>
  );
}
