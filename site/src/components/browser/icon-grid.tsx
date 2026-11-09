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

/** How long tiles take to appear when the list changes. They never travel, so results stay put while typing. */
const ARRIVE_MS = 140;

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
  // When the list changes, tiles that keep their place stay still and the rest fade in where they belong.
  const shown = useRef({ icons, cols });
  useLayoutEffect(() => {
    const was = shown.current;
    shown.current = { icons, cols };
    const grid = ref.current;
    if (was.icons === icons || !animateChanges || !grid || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.scrollY > restScroll()) {
      grid.animate({ opacity: [0, 1] }, { duration: ARRIVE_MS, easing: "ease-out" });
      return;
    }
    const before = new Map(was.icons.map((m, i) => [m.name, i]));
    for (const el of grid.children as HTMLCollectionOf<HTMLElement>) {
      if (before.get(el.dataset.name!) === Number(el.dataset.index) && was.cols === cols) continue;
      // A tile still fading from the last change continues from where it is.
      const moving = el.getAnimations();
      const opacity = moving.length ? getComputedStyle(el).opacity : "0";
      moving.forEach((a) => a.cancel());
      el.animate({ opacity: [opacity, "1"] }, { duration: ARRIVE_MS, easing: "ease-out" });
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
