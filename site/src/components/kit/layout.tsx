import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The page column: centred, max width, side gutter. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-gutter", className)}>{children}</div>;
}

/** A standalone page in a narrower column; these pages share one width and title position. */
export function NarrowPage({ children }: { children: ReactNode }) {
  return <Container className="min-h-[calc(100dvh-var(--header))] max-w-4xl space-y-8 pt-10 pb-section">{children}</Container>;
}

/** A page section with the standard vertical rhythm. */
export function Section({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("py-section", className)}>{children}</section>;
}

/** Section heading with an optional lead paragraph. */
export function Heading({ title, lead, level = 2, className }: { title: ReactNode; lead?: ReactNode; level?: 1 | 2; className?: string }) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <div className={cn("space-y-3", className)}>
      <H className={cn("font-heading font-semibold text-balance", level === 1 ? "text-title" : "text-heading")}>{title}</H>
      {lead ? <p className="max-w-2xl text-lead text-muted-foreground text-pretty">{lead}</p> : null}
    </div>
  );
}
