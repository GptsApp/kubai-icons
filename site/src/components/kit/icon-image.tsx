"use client";
// Icons in long lists are bitmaps at rest. Each icon is drawn once from its SVG at the
// screen's pixel density, so scrolling only copies pixels and never re-runs the icons'
// blur filters. Bitmaps are made a few at a time, on-screen icons first. Hovering or
// focusing the trigger swaps in the live SVG, which plays the motion.
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { KubaiIcon } from "kubai-icons-react";
import { animate, toSvg, type KubaiIconData } from "kubai-icons";
import { loadSvgImage } from "@/lib/export";
import { cn } from "@/lib/utils";

export type IconLook = { color?: string; variant?: "color" | "soft"; badgeColor?: string };
type Pose = "rest" | "hover";

// Room round the 31-unit canvas for the shadow, which an image would otherwise clip.
const PAD = 5;
const SIDE = 31 + PAD * 2;

/** The end of the icon's hover motion, applied to its rest markup. */
function hoverPose(svg: string, icon: KubaiIconData) {
  const host = document.createElement("div");
  host.innerHTML = svg;
  const el = host.firstElementChild!;
  const ctl = animate(el, icon);
  ctl.hover(true, true);
  ctl.destroy();
  return new XMLSerializer().serializeToString(el);
}

/**
 * A data URL of the icon's SVG at rest or at the end of its hover, padded for its shadow.
 * Its intrinsic size is the bitmap's size: WebKit renders the masks and filters of an SVG
 * image at the intrinsic size and scales the result.
 */
export function iconUrl(icon: KubaiIconData, { color, variant = "color", badgeColor }: IconLook, pose: Pose, px: number) {
  let svg = toSvg(icon, { color, variant, badgeColor, id: "k", attrs: { viewBox: `${-PAD} ${-3 - PAD} ${SIDE} ${SIDE}`, width: px, height: px } });
  if (pose === "hover") svg = hoverPose(svg, icon);
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// ---------- Bitmap cache ----------
// Each key is drawn once into a canvas kept in memory; tiles copy it onto their own small
// canvas, which is a plain pixel copy. The cache keeps the most recently used bitmaps, up
// to a memory budget well inside the total canvas memory iOS Safari allows.
type Bitmap = HTMLCanvasElement;
const CACHE_BYTES = 64 * 1024 * 1024;
const bytesOf = (bmp: Bitmap) => bmp.width * bmp.height * 4;
const bitmaps = new Map<string, Bitmap>();
let cacheBytes = 0;
const forget = (key: string) => {
  const bmp = bitmaps.get(key);
  if (!bmp) return;
  bitmaps.delete(key);
  cacheBytes -= bytesOf(bmp);
};
const remember = (key: string, bmp: Bitmap) => {
  forget(key);
  bitmaps.set(key, bmp);
  cacheBytes += bytesOf(bmp);
  while (cacheBytes > CACHE_BYTES) forget(bitmaps.keys().next().value!);
};
const recall = (key: string) => {
  const bmp = bitmaps.get(key);
  if (bmp) remember(key, bmp);
  return bmp;
};
const keyOf = (icon: KubaiIconData, { color, variant = "color", badgeColor }: IconLook, pose: Pose, px: number) =>
  `${icon.name}|${color}|${variant}|${badgeColor}|${pose}|${px}`;
/** True when two bitmap keys show the same icon, pose and size in different colours. */
const recoloured = (a: string | null, b: string) => {
  if (!a || a === b) return false;
  const x = a.split("|"), y = b.split("|");
  return x[0] === y[0] && x[4] === y[4] && x[5] === y[5];
};
const canvas2d = (c: HTMLCanvasElement) => c.getContext("2d", { willReadFrequently: true })!;

async function makeBitmap(icon: KubaiIconData, look: IconLook, pose: Pose, px: number): Promise<Bitmap | null> {
  try {
    const img = await loadSvgImage(iconUrl(icon, look, pose, px));
    const c = document.createElement("canvas");
    c.width = c.height = px;
    canvas2d(c).drawImage(img, 0, 0, px, px);
    return c;
  } catch {
    return null;
  }
}

// Jobs run a few at a time; each round starts the ones on or near the screen first.
const PARALLEL = 6;
type Job = { el: Element; key: string; run: () => Promise<Bitmap | null>; done: (bmp: Bitmap | null) => void };
const jobs = new Set<Job>();
const waiting = new Map<string, ((bmp: Bitmap | null) => void)[]>();
let running = 0;
let pumping = false;
function pump() {
  pumping = false;
  const h = window.innerHeight;
  // On-screen icons first, then the ones just outside the view.
  const rank = (j: Job) => {
    const r = j.el.getBoundingClientRect();
    return r.bottom > 0 && r.top < h ? 0 : r.bottom > -h / 2 && r.top < h * 1.5 ? 1 : 2;
  };
  const order = [...jobs].map((j) => ({ j, at: rank(j) })).sort((a, b) => a.at - b.at).map(({ j }) => j);
  for (const j of order) {
    if (running >= PARALLEL) break;
    jobs.delete(j);
    const cached = recall(j.key);
    if (cached) { j.done(cached); continue; }
    const others = waiting.get(j.key);
    if (others) { others.push(j.done); continue; }
    waiting.set(j.key, [j.done]);
    running++;
    j.run().then((bmp) => {
      if (bmp) remember(j.key, bmp);
      for (const fn of waiting.get(j.key) ?? []) fn(bmp);
      waiting.delete(j.key);
      running--;
      schedule();
    });
  }
  if (jobs.size && running < PARALLEL) schedule();
}
function schedule() {
  if (!pumping) { pumping = true; requestAnimationFrame(pump); }
}

// Icons that arrive while the page is loading appear at once. Once the visitor has done
// something, such as scrolling, an icon that had to wait for its bitmap fades in.
let interacted = false;
if (typeof window !== "undefined") {
  const mark = () => { interacted = true; };
  for (const type of ["wheel", "touchmove", "keydown", "pointerdown"]) window.addEventListener(type, mark, { capture: true, once: true, passive: true });
}

const dpr = () => (typeof window === "undefined" ? 2 : Math.min(3, Math.max(1, window.devicePixelRatio || 1)));

/** Starts making a bitmap ahead of use, e.g. the detail preview while its tile is hovered. */
export function prefetchIcon(icon: KubaiIconData, look: IconLook, size: number, pose: Pose = "rest") {
  const px = Math.round((SIDE * size * dpr()) / 31);
  const key = keyOf(icon, look, pose, px);
  if (bitmaps.has(key) || waiting.has(key)) return;
  jobs.add({ el: document.body, key, run: () => makeBitmap(icon, look, pose, px), done: () => {} });
  schedule();
}

/** A still icon, the same size and position as the live one. */
export function IconImage({ icon, size, raster = size, pose = "rest", ...look }: IconLook & { icon: KubaiIconData; size: number; raster?: number; pose?: Pose }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const px = Math.round((SIDE * raster * dpr()) / 31);
  const key = keyOf(icon, look, pose, px);
  const [shown, setShown] = useState<string | null>(null);
  // Fades in only when the icon had to wait for its bitmap.
  const [fade, setFade] = useState(false);
  const drawn = useRef<string | null>(null);
  // Draws the bitmap for `key` as soon as it exists; until then the previous drawing (or
  // the placeholder) stays.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = (bmp: Bitmap | null, waited: boolean) => {
      if (!bmp) return;
      if (el.width !== px) { el.width = el.height = px; }
      const g = canvas2d(el);
      g.clearRect(0, 0, px, px);
      g.drawImage(bmp, 0, 0);
      if (recoloured(drawn.current, key) && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.animate({ opacity: [0.5, 1] }, { duration: 200, easing: "ease-out" });
      }
      drawn.current = key;
      setShown((prev) => { if (waited && prev === null && interacted) setFade(true); return key; });
    };
    const cached = recall(key);
    if (cached) { paint(cached, false); return; }
    let alive = true;
    const job: Job = { el, key, run: () => makeBitmap(icon, look, pose, px), done: (b) => { if (alive) paint(b, true); } };
    jobs.add(job);
    schedule();
    return () => { alive = false; jobs.delete(job); };
    // `look` is covered by `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const k = size / 31;
  // At its own size the bitmap maps one to one onto device pixels, without resampling.
  const side = raster === size ? px / dpr() : SIDE * k;
  const inset = (size - side) / 2;
  return (
    <span className="relative block shrink-0" style={{ width: size, height: size }}>
      {!shown && <span className="absolute inset-[14%] rounded-control bg-muted-foreground/8" />}
      <canvas
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none absolute", shown ? "visible" : "invisible", fade && "swap-in")}
        style={{ left: inset, top: inset, width: side, height: side }}
      />
    </span>
  );
}

/**
 * A bitmap until its trigger (the closest [data-kubai-trigger], or the parent) is hovered
 * or focused from the keyboard; then the live icon, which stays for later hovers.
 * `hover` plays the motion too, and holds the hover pose for as long as it is set.
 * `raster` is the size the bitmap is drawn at, when that differs from the size on screen.
 */
export const HoverIcon = memo(function HoverIcon({ icon, size, raster, hover, ...look }: IconLook & { icon: KubaiIconData; size: number; raster?: number; hover?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [live, setLive] = useState(false);
  const [hot, setHot] = useState(false);
  const [mounted, setMounted] = useState(false);
  const want = useRef(false);
  const liveRef = useRef(false);
  liveRef.current = live;

  useEffect(() => {
    const host = ref.current?.closest("[data-kubai-trigger]") ?? ref.current?.parentElement;
    if (!host) return;
    let count = 0;
    const on = () => {
      count++;
      want.current = true;
      // The live icon mounts at rest first, then plays, so the motion is never skipped.
      if (liveRef.current) setHot(true); else setLive(true);
    };
    const off = () => {
      count = Math.max(0, count - 1);
      if (count) return;
      want.current = false;
      setHot(false);
    };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") on(); };
    const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") off(); };
    let focused = false;
    const focus = (e: FocusEvent) => {
      if (focused || !(e.target as Element).matches?.(":focus-visible")) return;
      focused = true;
      on();
    };
    const blur = () => { if (focused) { focused = false; off(); } };
    host.addEventListener("pointerenter", enter as EventListener);
    host.addEventListener("pointerleave", leave as EventListener);
    host.addEventListener("focusin", focus as EventListener);
    host.addEventListener("focusout", blur);
    return () => {
      host.removeEventListener("pointerenter", enter as EventListener);
      host.removeEventListener("pointerleave", leave as EventListener);
      host.removeEventListener("focusin", focus as EventListener);
      host.removeEventListener("focusout", blur);
    };
  }, []);
  useEffect(() => { if (hover) setLive(true); }, [hover]);
  useEffect(() => {
    if (!live) return;
    setMounted(true);
    if (want.current) setHot(true);
  }, [live]);

  return (
    <span ref={ref} className="relative block shrink-0" style={{ width: size, height: size }}>
      {live ? (
        <KubaiIcon icon={icon} size={size} {...look} trigger="none" hover={hot || (mounted && Boolean(hover))} className="block" />
      ) : (
        <IconImage icon={icon} size={size} raster={raster} {...look} />
      )}
    </span>
  );
});
