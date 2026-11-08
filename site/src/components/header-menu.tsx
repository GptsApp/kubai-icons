"use client";
import { usePathname } from "next/navigation";
import { RiFeedbackLine, RiGithubLine, RiMoreFill, RiTwitterXLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { track } from "@/lib/analytics";
import { absolute } from "@/lib/seo";
import { AUTHOR, feedbackUrl, REPO } from "@/lib/site";

/** The header's outside links, gathered into one menu where the bar is too narrow for them. */
export function HeaderMenu({ className }: { className?: string }) {
  const path = usePathname() ?? "/";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More links" className={className} />}>
        <RiMoreFill className="size-[18px] text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem render={<a href={feedbackUrl(absolute(path))} target="_blank" rel="noreferrer" />} onClick={() => track("feedback_open")}>
          <RiFeedbackLine />Feedback
        </DropdownMenuItem>
        <DropdownMenuItem render={<a href={REPO} target="_blank" rel="noreferrer" />}>
          <RiGithubLine />GitHub
        </DropdownMenuItem>
        <DropdownMenuItem render={<a href={AUTHOR.x} target="_blank" rel="noreferrer" />} onClick={() => track("author_x_open", { place: "header_menu" })}>
          <RiTwitterXLine />{AUTHOR.name} on X
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
