"use client";
import Link from "next/link";
import { Wand } from "kubai-icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalize, useTr } from "@/lib/use-locale";

/** Points readers who cannot find an icon to the skill that draws new ones. */
export function SkillPrompt({ className }: { className?: string }) {
  const tr = useTr();
  const loc = useLocalize();
  return (
    <aside data-kubai-trigger className={cn("flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-card border px-5 py-4", className)}>
      <div className="flex min-w-0 flex-1 basis-64 items-center gap-3.5">
        <Wand size={28} color="#8B5CF6" trigger="parent" className="shrink-0" />
        <div className="min-w-0">
          <p className="text-body font-medium">{tr("Can’t find the icon you need?", "没找到需要的图标？")}</p>
          <p className="text-body text-muted-foreground">{tr("The Kubai Icons skill draws new ones for your product in the same style.", "Kubai Icons Skill 可按同一风格为产品绘制新图标")}</p>
        </div>
      </div>
      <Link href={loc("/skill/")} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>{tr("Get the skill", "安装 Skill")}</Link>
    </aside>
  );
}
