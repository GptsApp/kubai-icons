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
import { cn } from "@/lib/utils";

// Links marked `wide` sit in the bar from the lg breakpoint; below it they are in HeaderMenu.
const NAV = [
  { href: "/icons/", label: "Icons" },
  { href: "/docs/", label: "Docs" },
  { href: "/skill/", label: "Skill" },
  { href: "/icons/submit/", label: "Submit", wide: true },
  { href: "/sponsor/", label: "Sponsor", wide: true },
];

/** The nav entry for a path: the most specific one, so /icons/submit/ is not also Icons. */
const currentHref = (path: string | null) => {
  const here = `${path ?? ""}/`.replace(/\/+$/, "/");
  return NAV.filter((n) => here.startsWith(n.href)).sort((a, b) => b.href.length - a.href.length)[0]?.href;
};

export function SiteHeader() {
  const current = currentHref(usePathname());
  return (
    <header className="header-rule sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-[calc(var(--header)-1px)] items-center gap-3 sm:gap-6">
        <Link href="/" className="tap relative flex shrink-0 items-center gap-2 text-subheading font-semibold whitespace-nowrap" aria-label="Kubai Icons">
          <Logo size={24} />
          <span className="hidden sm:inline">Kubai Icons</span>
        </Link>
        <nav className="relative isolate flex min-w-0 items-center gap-0.5 overflow-x-auto text-control pointer-coarse:py-1.5 sm:gap-1">
          <Glide selector="[aria-current=page]" className="rounded-control bg-muted" />
          {NAV.map((n) => {
            const active = n.href === current;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn("tap relative rounded-control px-2 py-1.5 whitespace-nowrap sm:px-2.5", n.wide && "hidden lg:block", quietLink, active && "text-foreground")}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <FeedbackLink label="Feedback" className={cn("tap relative hidden h-8 items-center justify-center gap-1.5 rounded-control pr-2.5 pl-2 text-control hover:bg-muted lg:flex", quietLink)}>
            <MessageCircle size={18} color="#5393FF" trigger="parent" />
            <span>Feedback</span>
          </FeedbackLink>
          <AuthorLink place="header" label="Kubai087 on X" className={cn("tap relative hidden size-8 place-items-center rounded-control hover:bg-muted lg:grid", quietLink)}>
            <RiTwitterXLine className="size-4" />
          </AuthorLink>
          <ThemeToggle />
          <GitHubStars className="ml-1 hidden min-[360px]:inline-flex" />
          <HeaderMenu className="ml-1 lg:hidden" />
        </div>
      </Container>
    </header>
  );
}
