"use client";
import { useEffect, useRef, useState } from "react";
import { STORY, useHeroBeat } from "@/components/hero-wall";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/use-locale";
import { HERO_TITLE_ZH } from "@/components/hero-title-zh";

const LINES = ["Folders open.", "Bells ring.", "Locks unlock."];
/** A Chinese phrase drawn as outlines. Its text stays for search engines and screen readers. */
function OutlinedPhrase({ text }: { text: string }) {
  const outline = HERO_TITLE_ZH[text];
  // Text with no outlines yet still shows, in the page's normal font.
  if (!outline) return text;
  const { width, d } = outline;
  return (
    <>
      <span className="sr-only">{text}</span>
      <svg aria-hidden viewBox={`0 0 ${width} 1000`} className="my-[.125em] h-[1em] w-auto shrink-0 fill-current">
        <path d={d} />
      </svg>
    </>
  );
}

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
  const lines = useTr()(LINES, null);

  if (!lines) {
    return (
      <h1 ref={ref} className={cn(className, "flex items-center gap-[.06em] whitespace-nowrap")}>
        <OutlinedPhrase text="让图标" />
        {/* The icons of the wall's story take turns here, each playing as its beat comes. */}
        <span aria-hidden className="grid size-[1em] shrink-0 *:[grid-area:1/1]">
          {STORY.map(({ Icon, color }, i) => (
            <Icon key={i} size={48} color={color} trigger="none" hover={beat === i} className={cn("size-full transition-opacity duration-300 motion-reduce:transition-none", (beat ?? 0) !== i && "opacity-0")} />
          ))}
        </span>
        <OutlinedPhrase text="动起来" />
      </h1>
    );
  }

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line, i) => {
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
