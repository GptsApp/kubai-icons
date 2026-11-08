"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiFeedbackLine, RiGithubLine, RiHeart3Line, RiMoreFill, RiTranslate2, RiTwitterXLine, RiUploadLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { track } from "@/lib/analytics";
import { absolute } from "@/lib/seo";
import { AUTHOR, feedbackUrl, REPO } from "@/lib/site";
import { useLanguageLink } from "./language-switch";
import { useLocalize, useTr } from "@/lib/use-locale";

/** Each row is a full-size touch target. */
const ITEM = "min-h-11 gap-2.5 px-2.5";

/** The header's secondary links, gathered into one menu where the bar is too narrow for them. */
export function HeaderMenu({ className }: { className?: string }) {
  const path = usePathname() ?? "/";
  const tr = useTr();
  const loc = useLocalize();
  const language = useLanguageLink();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label={tr("More links", "更多链接")} className={className} />}>
        <RiMoreFill className="size-[18px] text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-52 p-1.5">
        <DropdownMenuItem className={ITEM} render={<Link href={loc("/icons/submit/")} />}>
          <RiUploadLine />{tr("Submit an icon", "提交图标")}
        </DropdownMenuItem>
        <DropdownMenuItem className={ITEM} render={<Link href={loc("/sponsor/")} />}>
          <RiHeart3Line />{tr("Sponsor", "赞助")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={ITEM} render={<a href={feedbackUrl(absolute(path))} target="_blank" rel="noreferrer" />} onClick={() => track("feedback_open")}>
          <RiFeedbackLine />{tr("Feedback", "反馈")}
        </DropdownMenuItem>
        <DropdownMenuItem className={ITEM} render={<a href={REPO} target="_blank" rel="noreferrer" />}>
          <RiGithubLine />GitHub
        </DropdownMenuItem>
        <DropdownMenuItem className={ITEM} render={<a href={AUTHOR.x} target="_blank" rel="noreferrer" />} onClick={() => track("author_x_open", { place: "header_menu" })}>
          <RiTwitterXLine />{tr(`${AUTHOR.name} on X`, `${AUTHOR.name} 的 X 主页`)}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<a href={language.href} hrefLang={language.hrefLang} onClick={language.onClick} />}>
          <RiTranslate2 />{language.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
