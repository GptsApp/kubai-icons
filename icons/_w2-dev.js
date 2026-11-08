// Shared pieces for the git, math, network, chart, health and tool icons drawn together.
import { OL, DEEPS, f, circ, rp, at } from '../packages/core/src/kit.js';

/** A filled layer with shadow and top glow, then its outside outline. */
export const solid = (u, d, fill, { sh = true, hi = true, rule = '' } = {}) => {
  const r = rule ? ` fill-rule="${rule}"` : '';
  let s = `<path d="${d}"${r} fill="${fill}"/>`;
  if (hi) s = `<g filter="${u.hi}">${s}</g>`;
  if (sh) s = `<g filter="${u.sh}">${s}</g>`;
  return s + `<path d="${d}"${r} ${OL}/>`;
};
/** A round node centred on the origin, placed by draw() through its data-n group. */
export const node = (u, n, r, fill) => `<g data-n="${n}">${solid(u, circ(0, 0, r), fill)}</g>`;
/** Stroke attributes of a deep 2.2 mark. */
export const MARK = `fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}`;
/** Translates a data-n element. */
export const move = (E, n, x, y) => at(E[n], { transform: `translate(${f(x)} ${f(y)})` });
/** Regular polygon points round (cx, cy); a0 in degrees clockwise from north. */
export const ngon = (n, r, cx = 15.5, cy = 12.5, a0 = 0) => Array.from({ length: n }, (_, i) => {
  const a = (a0 + i * 360 / n) * Math.PI / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
});
/** Solid arrowhead with its tip at (x, y), pointing along angle a (degrees, 0 = right). */
export function head(x, y, a, len = 3.4, half = 2.9) {
  const r = a * Math.PI / 180, ux = Math.cos(r), uy = Math.sin(r);
  const bx = x - ux * len, by = y - uy * len;
  return rp([[bx - uy * half, by + ux * half], [x, y], [bx + uy * half, by - ux * half]], [0.5, 0.6, 0.5]);
}
