"use client";
import { useEffect, useRef, useState } from "react";
import { Heart } from "kubai-icons-react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { IconMeta, Category } from "@/lib/icons";
import { asset } from "@/lib/site";
import { hostSponsorNudge } from "@/lib/sponsor-nudge";
import { cn } from "@/lib/utils";
import type { Badge as BadgeMode } from "./prefs";
import { IconDetail } from "./icon-detail";

type Props = {
  meta: IconMeta | null;
  related: IconMeta[];
  categories: Category[];
  color: string;
  variant: "color" | "soft";
  badge: BadgeMode;
  onBadge: (b: BadgeMode) => void;
  onClose: () => void;
  onOpen: (m: IconMeta) => void;
  onCategory: (id: string) => void;
  onKeyword: (word: string) => void;
};

/** Height the sponsor note needs below the panel, including its margins. */
const NOTE_ROOM = 60;
/** How long the sponsor note stays, in milliseconds. */
const NOTE_TIME = 10000;

export function IconDialog({ meta: current, related: currentRelated, onClose, ...rest }: Props) {
  // The last icon stays in the panel while it animates out, so the panel keeps its size.
  const kept = useRef({ meta: current, related: currentRelated });
  if (current) kept.current = { meta: current, related: currentRelated };
  const { meta, related } = kept.current;
  const popup = useRef<HTMLDivElement>(null);
  // Focus starts on the panel rather than its first control, so opening from the address
  // shows no focus ring. The arrow keys scroll the panel from here.
  const content = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(false);
  const open = Boolean(current);

  useEffect(() => {
    if (!open) return;
    const unhost = hostSponsorNudge(() => {
      const box = popup.current?.getBoundingClientRect();
      if (!box || window.innerHeight - box.bottom < NOTE_ROOM) return false;
      setNote(true);
      return true;
    });
    return () => {
      unhost();
      setNote(false);
    };
  }, [open]);

  useEffect(() => {
    if (!note) return;
    const timer = window.setTimeout(() => setNote(false), NOTE_TIME);
    return () => window.clearTimeout(timer);
  }, [note]);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent ref={popup} initialFocus={content} className="max-h-[calc(100dvh-2rem)] gap-0 rounded-panel p-0 sm:max-w-3xl" closeClassName="top-3 right-3 size-8">
        {/* Only the content scrolls, so the close button stays in reach. */}
        <div ref={content} tabIndex={-1} className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[inherit] outline-none">
          {meta && <IconDetail meta={meta} related={related} title={DialogTitle} description={DialogDescription} {...rest} />}
        </div>
        {note && (
          <div className="absolute top-full left-1/2 mt-2.5 flex -translate-x-1/2 items-center gap-3.5 rounded-xl bg-popover py-1.5 pr-1.5 pl-4 whitespace-nowrap shadow-lg ring-1 ring-foreground/10 duration-200 animate-in fade-in-0 slide-in-from-top-1 motion-reduce:animate-none">
            <span className="text-muted-foreground">Kubai Icons is free to use.</span>
            <a href={asset("/sponsor/")} target="_blank" rel="noreferrer" data-kubai-trigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5 pr-2.5 pl-2")}>
              <Heart size={16} color="#EC4899" trigger="parent" className="size-4" />
              Sponsor
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
