import Link from "next/link";
import { Wand } from "kubai-icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Points readers who cannot find an icon to the skill that draws new ones. */
export function SkillPrompt({ className }: { className?: string }) {
  return (
    <aside data-kubai-trigger className={cn("flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-card border px-5 py-4", className)}>
      <div className="flex min-w-0 flex-1 basis-64 items-center gap-3.5">
        <Wand size={28} color="#8B5CF6" trigger="parent" className="shrink-0" />
        <div className="min-w-0">
          <p className="text-body font-medium">Can&apos;t find the icon you need?</p>
          <p className="text-body text-muted-foreground">The Kubai Icons skill draws new ones for your product in the same style.</p>
        </div>
      </div>
      <Link href="/skill/" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Get the skill</Link>
    </aside>
  );
}
