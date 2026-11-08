"use client";
import { useLayoutEffect, useState } from "react";

export type Badge = "mono" | "semantic";
export type Prefs = { color: string; variant: "color" | "soft"; badge: Badge; size: number };
/** The `color` preference that gives each icon in the grid its own colour. */
export const MIXED = "mixed";
export const DEFAULT_PREFS: Prefs = { color: MIXED, variant: "color", badge: "mono", size: 32 };
export { SWATCHES, MIXED_FILL, mixedColor, mixedColors } from "@/lib/palette";

export const PREVIEW_SIZE = 128;
const KEY = "kubai-icons:preferences";

/** Viewer preferences, remembered in this browser when storage is available. */
export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  // Read before the first paint of the grid, so it never shows the defaults first.
  useLayoutEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved) setPrefs((p) => ({ ...p, color: saved.color ?? p.color, variant: saved.variant ?? p.variant, badge: saved.badge ?? p.badge, size: saved.size ?? p.size }));
    } catch {
      // Storage may be blocked; defaults are fine.
    }
  }, []);
  const update = (next: Partial<Prefs>) =>
    setPrefs((p) => {
      const v = { ...p, ...next };
      try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* ignore */ }
      return v;
    });
  return [prefs, update] as const;
}
