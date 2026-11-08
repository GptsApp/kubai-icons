"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { absolute } from "@/lib/seo";
import { feedbackUrl } from "@/lib/site";

/** Opens the feedback form with the current page filled in. */
export function FeedbackLink({ className, children, label }: { className?: string; children: ReactNode; label?: string }) {
  const path = usePathname() ?? "/";
  return (
    <a href={feedbackUrl(absolute(path))} target="_blank" rel="noreferrer" aria-label={label} className={className} onClick={() => track("feedback_open", { page: path })}>
      {children}
    </a>
  );
}
