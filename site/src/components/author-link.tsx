"use client";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { AUTHOR } from "@/lib/site";

/** A link to the author's X profile; `place` says where on the site it was used. */
export function AuthorLink({ place, className, children, label }: { place: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={AUTHOR.x} target="_blank" rel="noreferrer" aria-label={label} className={className} onClick={() => track("author_x_open", { place })}>
      {children}
    </a>
  );
}
