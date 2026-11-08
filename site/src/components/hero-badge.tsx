"use client";
import Link from "next/link";
import { RiArrowRightSLine } from "@remixicon/react";
import { Sparkles } from "kubai-icons-react";
import { raised } from "@/components/kit/styles";
import { cn } from "@/lib/utils";
import { useLocalize, useTr } from "@/lib/use-locale";

/** The line above the home page headline: the size of the set, and a way to the skill. */
export function HeroBadge({ count }: { count: number }) {
  const tr = useTr();
  const loc = useLocalize();
  return (
    <Link href={loc("/skill/")} className={cn("group tap relative inline-flex h-8 items-center gap-2 rounded-pill pr-1.5 pl-2.5 text-caption font-medium whitespace-nowrap transition-[filter] hover:brightness-[.98] dark:hover:brightness-[1.2]", raised)}>
      <Sparkles size={16} color="#8B5CF6" trigger="parent" />
      <span className="tabular-nums">{tr(`${count.toLocaleString("en")} icons`, `${count.toLocaleString("en")} 个图标`)}</span>
      <span aria-hidden className="h-3 w-px bg-border" />
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        <span className="max-[399px]:hidden">{tr("Now with an ", "现已提供 ")}</span>{tr("agent skill", "Agent Skill")}
      </span>
      <RiArrowRightSLine className="-ml-1 size-4 text-muted-foreground transition-[translate] duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </Link>
  );
}
