// Shared shapes for the kitchen and produce icons: filled layers and ribbons cut from a curve.
import { f, OL } from '../packages/core/src/kit.js';

/** A mid-tone back layer with its shadow, top light and outline. */
export const solid = (u, d, attrs = '') => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" ${attrs} fill="${u.loS}"/></g></g><path d="${d}" ${attrs} ${OL}/>`;

/** A lighter front layer with its top light and outline. */
export const light = (u, d, attrs = '') => `<g filter="${u.hi}"><path d="${d}" ${attrs} fill="${u.upS}"/></g><path d="${d}" ${attrs} ${OL}/>`;

/** A lighter front layer that also casts a shadow. */
export const raised = (u, d, attrs = '') => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" ${attrs} fill="${u.upS}"/></g></g><path d="${d}" ${attrs} ${OL}/>`;

/** A flame with a notch in its left side, standing on (cx, by), 10s tall and 7s wide. */
export function lick(cx, by, s = 1) {
  const q = (x, y) => f(cx + x * s) + ' ' + f(by + y * s);
  return `M${q(0, -10)}C${q(0.6, -7.6)} ${q(3.5, -6.2)} ${q(3.5, -3.2)}C${q(3.5, -1.1)} ${q(1.9, 0)} ${q(0, 0)}C${q(-1.9, 0)} ${q(-3.5, -1.1)} ${q(-3.5, -3.2)}`
    + `C${q(-3.5, -4.6)} ${q(-2.8, -5.7)} ${q(-1.8, -6.4)}C${q(-1.7, -5.4)} ${q(-1.3, -4.7)} ${q(-0.6, -4.4)}C${q(-0.9, -6.6)} ${q(-1, -8.6)} ${q(0, -10)}Z`;
}

/** n+1 points along a cubic Bézier. */
export function cubic(p0, c1, c2, p3, n = 16) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, s = 1 - t;
    out.push([0, 1].map((k) => s * s * s * p0[k] + 3 * s * s * t * c1[k] + 3 * s * t * t * c2[k] + t * t * t * p3[k]));
  }
  return out;
}

/** Joins point runs that share their end points. */
export const chain = (...runs) => runs.flatMap((run, i) => (i ? run.slice(1) : run));

/** Offset of each point along the normal of the run through it. */
export function offset(pts, h) {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1e-6;
    return [p[0] + (dy / d) * h, p[1] - (dx / d) * h];
  });
}

const line = (pts) => pts.map((p, i) => (i ? 'L' : '') + f(p[0]) + ' ' + f(p[1])).join('');

/** A closed clockwise ribbon round the points, w wide (or w(t) for t 0..1), with round ends. */
export function ribbon(pts, w) {
  const width = typeof w === 'function' ? w : () => w;
  const n = pts.length, left = [], right = [];
  pts.forEach((p, i) => {
    const h = width(i / (n - 1)) / 2;
    left.push(offset(pts, h)[i]);
    right.push(offset(pts, -h)[i]);
  });
  const hs = f(width(0) / 2), he = f(width(1) / 2);
  return `M${line(left)}A${he} ${he} 0 0 1 ${f(right[n - 1][0])} ${f(right[n - 1][1])}L${line([...right].reverse())}A${hs} ${hs} 0 0 1 ${f(left[0][0])} ${f(left[0][1])}Z`;
}
