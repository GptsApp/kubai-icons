// Shared geometry for the vehicle, street-furniture and building icons.
import { f, OL, at, rattle } from '../packages/core/src/kit.js';

export { back, front } from './_commerce-charts.js';
export { wheel, carSide } from './_travel-transport.js';

/** Points turned by a degrees (clockwise on screen) round (cx, cy). */
export const turn = (pts, a, cx, cy) => {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
  return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]);
};
/** Points moved by (dx, dy). */
export const shift = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
/** Sets one path on a named fill and on its outline `<n>O`. */
export const setD = (E, n, d) => { at(E[n], { d }); at(E[`${n}O`], { d }); };
/** The transform of a vehicle pulling forward, rocking on its springs and settling. */
export const drive = (o, ax = 8.6, ay = 20.4) => `translate(${f(1.2 * o - 0.5 + rattle(o, 0.8, 1))} 0) rotate(${f(rattle(o, -1.6, 2))} ${ax} ${ay})`;
/** Circle, clockwise: inside a circ() of the opposite winding it punches a hole. */
export const circCw = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`;
/** An outlined puff on a named path pair, for smoke and bubbles. */
export const puff = (u, n) => `<g filter="${u.hi}"><path data-n="${n}" fill="${u.upS}"/></g><path data-n="${n}O" ${OL}/>`;
