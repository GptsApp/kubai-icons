"use client";
import { useState } from "react";
import { toast } from "sonner";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { browserLocale, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";


export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(pick(browserLocale(), "Copied", "已复制"));
    return true;
  } catch {
    toast.error(pick(browserLocale(), "Copy failed", "复制失败"));
    return false;
  }
}

export function CopyButton({ text, className, onCopy }: { text: string; className?: string; onCopy?: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("text-muted-foreground", className)}
      aria-label={pick(browserLocale(), "Copy", "复制")}
      data-kubai-trigger
      onClick={async () => {
        if (await copyText(text)) {
          onCopy?.();
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        }
      }}
    >
      <span className="grid *:[grid-area:1/1] *:transition-[opacity,scale,filter] *:duration-200 *:ease-out motion-reduce:*:transition-none">
        <RiFileCopyLine className={cn("size-4", done && "scale-50 opacity-0 blur-[2px]")} />
        <RiCheckLine className={cn("size-4 text-positive", !done && "scale-50 opacity-0 blur-[2px]")} />
      </span>
    </Button>
  );
}
