"use client";
import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Centres an item that lies outside its scrolling parent, leaving the page where it is. */
function reveal(box: HTMLElement, item: HTMLElement, smooth: boolean) {
  const centred = (at: number, size: number, scroll: number, view: number) =>
    at < scroll || at + size > scroll + view ? at - (view - size) / 2 : scroll;
  const left = centred(item.offsetLeft, item.offsetWidth, box.scrollLeft, box.clientWidth);
  const top = centred(item.offsetTop, item.offsetHeight, box.scrollTop, box.clientHeight);
  if (left === box.scrollLeft && top === box.scrollTop) return;
  box.scrollTo({ left, top, behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant" });
}

/**
 * A highlight that travels to whichever item in its parent matches `selector`. The parent
 * must be `relative isolate`, and the items must sit directly in its coordinate space.
 *
 * Server-rendered items carry their own active style. Once the highlight has measured, the
 * parent gets `data-glide`, and items hide that style with `in-[[data-glide]]:`.
 * `line` follows the item's left edge and width only, for underlines.
 * `still` fades the highlight in at the new item instead of travelling there, for lists and
 * navigation, where the distance is long or the items are far from a single row.
 */
export function Glide({ selector, line, still, className }: { selector: string; line?: boolean; still?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    const box = el.parentElement!;
    let placed = false;
    let shown: HTMLElement | null = null;
    const place = () => {
      const item = box.querySelector<HTMLElement>(selector);
      if (!item) {
        el.style.opacity = "0";
        placed = false;
        shown = null;
        return;
      }
      const first = !placed;
      const moved = item !== shown;
      // The first placement, and a return from having no match, must not travel.
      const jump = !placed || still;
      if (jump) el.style.transition = "none";
      el.style.opacity = "";
      el.style.width = `${item.offsetWidth}px`;
      if (!line) el.style.height = `${item.offsetHeight}px`;
      el.style.transform = `translate(${item.offsetLeft}px, ${line ? 0 : item.offsetTop}px)`;
      if (jump) {
        el.getBoundingClientRect();
        el.style.transition = "";
      }
      if (still && moved && !first && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.animate({ opacity: [0, 1] }, { duration: 120, easing: "ease-out" });
      }
      placed = true;
      box.setAttribute("data-glide", "");
      if (item !== shown) {
        shown = item;
        reveal(box, item, !first);
      }
    };
    place();
    const onChange = new MutationObserver(place);
    onChange.observe(box, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-current", "aria-checked", "aria-pressed", "aria-selected"] });
    const onResize = new ResizeObserver(place);
    onResize.observe(box);
    return () => {
      onChange.disconnect();
      onResize.disconnect();
      box.removeAttribute("data-glide");
    };
  }, [selector, line, still]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 -z-10 transition-[transform,width,height,opacity] duration-[240ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
        !line && "top-0",
        className,
      )}
    />
  );
}
