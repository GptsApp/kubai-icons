// Shared shapes for the home and food icons: flames, leaves, steam and dripping edges.
import { f } from '../packages/core/src/kit.js';

/** A teardrop flame standing on (cx, by): round base w wide, tip h above the base. */
export function flame(cx, by, w, h) {
  const r = w / 2, t = by - h;
  return `M${f(cx)} ${f(t)}C${f(cx + r * 0.35)} ${f(t + h * 0.3)} ${f(cx + r)} ${f(by - r * 1.7)} ${f(cx + r)} ${f(by - r)}`
    + `A${f(r)} ${f(r)} 0 0 1 ${f(cx - r)} ${f(by - r)}C${f(cx - r)} ${f(by - r * 1.7)} ${f(cx - r * 0.35)} ${f(t + h * 0.3)} ${f(cx)} ${f(t)}Z`;
}

/** An almond leaf from its base to its tip, w wide at the middle. */
export function leaf(b, t, w) {
  const dx = t[0] - b[0], dy = t[1] - b[1], d = Math.hypot(dx, dy) || 1e-6;
  const nx = -dy / d * w, ny = dx / d * w, mx = (b[0] + t[0]) / 2, my = (b[1] + t[1]) / 2;
  return `M${f(b[0])} ${f(b[1])}Q${f(mx + nx)} ${f(my + ny)} ${f(t[0])} ${f(t[1])}Q${f(mx - nx)} ${f(my - ny)} ${f(b[0])} ${f(b[1])}Z`;
}

/** A wisp of steam rising from (x, y): a wavy line `n` half-waves of 3 units each. */
export function steam(x, y, n = 2, amp = 1.3) {
  let d = `M${f(x)} ${f(y)}Q${f(x - amp)} ${f(y - 1.5)} ${f(x)} ${f(y - 3)}`;
  for (let i = 1; i < n; i++) d += `T${f(x)} ${f(y - 3 * (i + 1))}`;
  return d;
}

/**
 * A strip with a flat top and rounded top corners whose lower edge hangs in drips:
 * x0..x1 wide, top at y, lower edge at base, each drip { x, w, d } a rounded tongue.
 */
export function drippy(x0, x1, y, base, drips, r = 2.2) {
  let d = `M${f(x0 + r)} ${f(y)}H${f(x1 - r)}Q${f(x1)} ${f(y)} ${f(x1)} ${f(y + r)}V${f(base)}`;
  [...drips].sort((a, b) => b.x - a.x).forEach(({ x, w, d: dp }) => {
    const hr = w / 2, low = base + Math.max(dp, hr);
    d += `H${f(x + hr)}V${f(low - hr)}A${f(hr)} ${f(hr)} 0 0 1 ${f(x - hr)} ${f(low - hr)}V${f(base)}`;
  });
  return d + `H${f(x0)}V${f(y + r)}Q${f(x0)} ${f(y)} ${f(x0 + r)} ${f(y)}Z`;
}

/** Steam that draws itself upward: dash offset and opacity for progress s (0..1). */
export const reveal = (s) => ({ 'stroke-dasharray': '1 1', 'stroke-dashoffset': f(1 - s), opacity: s < 0.02 ? 0 : 1 });
