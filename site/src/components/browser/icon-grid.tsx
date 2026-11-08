"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { IconMeta } from "@/lib/icons";
import { IconTile } from "./icon-tile";
import { MIXED, mixedColors } from "./prefs";

/** Gap between tiles; matches the --grid-gap token. */
const GAP = 10;

/** Rough height of what covers the top of the page, for choosing the icon to keep in view. */
const COVERED = 190;

/** How long tiles take to reach new places when the column count changes. */
const REFLOW_MS = 320;
const REFLOW_EASE = "cubic-bezier(.22,1,.36,1)";

/** How long tiles take to reach new places when the list changes. */
const MOVE_MS = 280;
/** The farthest a tile travels, in tiles. A longer trip would cross the grid, so it arrives instead. */
const MOVE_FARTHEST = 3.5;
/** How tiles that were not on screen arrive: quickly, and one shortly after another. */
const ARRIVE_MS = 180;
const ARRIVE_STEP = 12;
const ARRIVE_LONGEST_WAIT = 96;

/** How long the size has to hold still before icons are redrawn at it. */
const RASTER_DELAY = 200;

/** A windowed grid: only the rows near the viewport are in the DOM. */
export function IconGrid({ icons, tile, size, color, variant, selecting, hits, animateChanges, restScroll, onOpen }: {
  icons: IconMeta[]; tile: number; size: number; color: string; variant: "color" | "soft"; selecting: boolean; hits?: Map<string, string | null>;
  /** Set once the visitor has changed the list, so what the page does while loading stays still. */
  animateChanges: boolean;
  /** Where the page scrolls to when the list changes, if it is further down than that. */
  restScroll: () => number;
  onOpen: (m: IconMeta, color: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // The grid's page offset moves whenever anything above it changes height, not only when
  // the grid resizes, so it is read after every render.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
    if (top !== offset) setOffset(top);
  });
  const cols = Math.max(4, Math.floor((width + GAP) / (tile + GAP)));
  const rows = Math.ceil(icons.length / cols);
  // Colours are assigned once per list, so an icon keeps its colour while the grid reflows.
  const measured = width > 0;
  const mixed = useMemo(
    () => (color === MIXED ? mixedColors(icons.map((m) => m.name), cols) : null),
    // `cols` is left out on purpose; see above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, icons, measured],
  );
  const cell = width ? (width - GAP * (cols - 1)) / cols : tile;
  const step = cell + GAP;
  const v = useWindowVirtualizer({ count: rows, estimateSize: () => step, overscan: 6, scrollMargin: offset });
  useEffect(() => { v.measure(); }, [cell, v]);
  // Tiles glide only for the moment after the column count changes, never during a scroll.
  const [placed, setPlaced] = useState({ cols, icons });
  const [reflow, setReflow] = useState(false);
  if (cols !== placed.cols || icons !== placed.icons) {
    setPlaced({ cols, icons });
    setReflow(icons === placed.icons && icons.length > 0);
  }
  useEffect(() => {
    if (!reflow) return;
    const id = setTimeout(() => setReflow(false), REFLOW_MS);
    return () => clearTimeout(id);
  }, [reflow, cols]);
  // When the list changes, tiles that stay on screen travel to their new places, and the
  // rest arrive where they belong instead of crossing the page.
  const shown = useRef({ icons, cols, step });
  useLayoutEffect(() => {
    const was = shown.current;
    shown.current = { icons, cols, step };
    const grid = ref.current;
    if (was.icons === icons || !animateChanges || !grid || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.scrollY > restScroll()) {
      grid.animate({ opacity: [0, 1] }, { duration: ARRIVE_MS, easing: "ease-out" });
      return;
    }
    const before = new Map(was.icons.map((m, i) => [m.name, i]));
    const top = grid.getBoundingClientRect().top;
    const onScreen = (y: number) => top + y + cell > 0 && top + y < window.innerHeight;
    let arrivals = 0;
    for (const el of grid.children as HTMLCollectionOf<HTMLElement>) {
      const index = Number(el.dataset.index);
      const from = before.get(el.dataset.name!);
      if (from === index && was.cols === cols) continue;
      const y = Math.floor(index / cols) * step;
      const to = el.style.transform;
      // A tile still moving from the last change continues from where it is.
      const moving = el.getAnimations();
      const now = moving.length ? getComputedStyle(el) : null;
      const current = now ? { transform: now.transform, opacity: now.opacity } : null;
      moving.forEach((a) => a.cancel());
      if (!onScreen(y)) continue;
      const fromY = from === undefined ? null : Math.floor(from / was.cols) * was.step;
      const fromX = from === undefined ? 0 : (from % was.cols) * was.step;
      const near = fromY !== null && Math.hypot((index % cols) * step - fromX, y - fromY) <= MOVE_FARTHEST * step;
      if (fromY !== null && near && onScreen(fromY)) {
        const start = current?.transform ?? `translate(${fromX}px, ${fromY}px)`;
        el.animate([{ transform: start, opacity: current?.opacity ?? 1 }, { transform: to, opacity: 1 }], { duration: MOVE_MS, easing: REFLOW_EASE });
      } else {
        const delay = Math.min(arrivals++ * ARRIVE_STEP, ARRIVE_LONGEST_WAIT);
        el.animate([{ transform: `${to} scale(.96)`, opacity: 0 }, { transform: to, opacity: 1 }], { duration: ARRIVE_MS, delay, easing: "ease-out", fill: "backwards" });
      }
    }
  });
  // While the size is changing, the existing bitmaps are scaled; they are redrawn once it settles.
  const [raster, setRaster] = useState(size);
  useEffect(() => {
    const id = setTimeout(() => setRaster(size), RASTER_DELAY);
    return () => clearTimeout(id);
  }, [size]);
  // When the column count changes, the icons at the top of the view stay at the top.
  const last = useRef({ cols, cell });
  useLayoutEffect(() => {
    const was = last.current;
    last.current = { cols, cell };
    if (was.cols === cols || !width || !was.cell) return;
    const at = (window.scrollY + COVERED - offset) / (was.cell + GAP);
    if (at <= 0) return;
    const row = Math.floor(at);
    const next = Math.floor((row * was.cols) / cols) + (at - row);
    const before = window.scrollY;
    window.scrollTo({ top: offset + next * (cell + GAP) - COVERED, behavior: "instant" });
    // The scroll is instant but the tiles glide, so the grid starts offset by the same amount.
    const moved = window.scrollY - before;
    if (moved && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.animate(
        [{ transform: `translateY(${moved}px)` }, { transform: "translateY(0)" }],
        { duration: REFLOW_MS, easing: REFLOW_EASE, composite: "add" },
      );
    }
  }, [cols, cell, width, offset]);
  return (
    <div ref={ref} className="relative w-full" style={{ height: rows * step }}>
      {width > 0 &&
        v.getVirtualItems().flatMap((row) =>
          icons.slice(row.index * cols, row.index * cols + cols).map((m, i) => (
            <div
              key={m.name}
              data-name={m.name}
              data-index={row.index * cols + i}
              className="absolute top-0 left-0 motion-reduce:transition-none"
              style={{
                width: cell,
                height: cell,
                transform: `translate(${i * step}px, ${row.index * step}px)`,
                transition: reflow ? `transform ${REFLOW_MS}ms ${REFLOW_EASE}, width ${REFLOW_MS}ms ${REFLOW_EASE}, height ${REFLOW_MS}ms ${REFLOW_EASE}` : undefined,
              }}
            >
              <IconTile meta={m} size={size} raster={raster} color={mixed ? mixed[row.index * cols + i] : color} variant={variant} selecting={selecting} hit={hits?.get(m.name)} onOpen={onOpen} />
            </div>
          )),
        )}
    </div>
  );
}
