"use client";
import { useEffect, useRef, useState } from "react";
import { STORY, useHeroBeat } from "@/components/hero-wall";
import { cn } from "@/lib/utils";

const LINES = ["Folders open.", "Bells ring.", "Locks unlock."];

/** The headline: each line lights up and plays its icon, in step with the icon wall. */
export function HeroHeadline({ className }: { className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);
  const beat = useHeroBeat(visible);

  return (
    <h1 ref={ref} className={className}>
      {LINES.map((line, i) => {
        const { Icon, color } = STORY[i];
        return (
          <span key={line}>
            <span className={cn("flex items-center gap-[.24em] transition-colors duration-300 motion-reduce:transition-none", beat !== null && beat !== i && "text-muted-foreground/70")}>
              {line}
              <Icon size={48} color={color} trigger="none" hover={beat === i} className="size-[.8em] shrink-0" />
            </span>{" "}
          </span>
        );
      })}
    </h1>
  );
}
