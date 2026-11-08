"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiFeedbackLine, RiGithubLine, RiHeart3Line, RiMoreFill, RiTwitterXLine, RiUploadLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { track } from "@/lib/analytics";
import { absolute } from "@/lib/seo";
import { AUTHOR, feedbackUrl, REPO } from "@/lib/site";

/** The header's secondary links, gathered into one menu where the bar is too narrow for them. */
export function HeaderMenu({ className }: { className?: string }) {
  const path = usePathname() ?? "/";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More links" className={className} />}>
        <RiMoreFill className="size-[18px] text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem render={<Link href="/icons/submit/" />}>
          <RiUploadLine />Submit an icon
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/sponsor/" />}>
          <RiHeart3Line />Sponsor
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
