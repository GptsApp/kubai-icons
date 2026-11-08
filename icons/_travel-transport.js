// Shared geometry for the travel and transport icons.
import { f, rp, OL, WHITE } from '../packages/core/src/kit.js';

/** Points in clockwise order (screen coordinates), so shapes in one path add up. */
export const cw = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a < 0 ? [...pts].reverse() : pts;
};

/** A map-pin drop with its round head of radius r centred on (cx, cy). */
export const pinPath = (cx, cy, r) => `M${f(cx)} ${f(cy + 1.62 * r)}C${f(cx - 0.418 * r)} ${f(cy + 1.165 * r)} ${f(cx - r)} ${f(cy + 0.658 * r)} ${f(cx - r)} ${f(cy)}`
  + `A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(cy)}C${f(cx + r)} ${f(cy + 0.658 * r)} ${f(cx + 0.418 * r)} ${f(cy + 1.165 * r)} ${f(cx)} ${f(cy + 1.62 * r)}Z`;

/** Point at angle a (degrees, clockwise from east) on a circle round (cx, cy). */
export const polar = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];

/**
 * A folded map of three panels: half-width w, fold depth a, from y=top to y=bot.
 * Returns the outline points (clockwise) and the x of the four edges and folds.
 */
export function mapFolds(w, a, top, bot, cx = 15.5) {
  const x = [cx - w, cx - w / 3, cx + w / 3, cx + w];
  const pts = [[x[0], top + a], [x[1], top], [x[2], top + a], [x[3], top], [x[3], bot - a], [x[2], bot], [x[1], bot - a], [x[0], bot]];
  return { x, pts };
}

/** Side view of a car facing right: cabin with two windows, body, and two wheels. */
export function carSide(u, dy = 0) {
  const P = (pts) => pts.map(([x, y]) => [x, y + dy]);
  const cabin = rp(P([[7.8, 10.6], [10.6, 3.8], [20, 3.8], [24, 10.6]]), [0, 1.8, 2.2, 0]);
  const win = rp(P([[10.4, 10.6], [12, 6], [15, 6], [15, 10.6]]), [0, 1, 1, 0]) + rp(P([[16.6, 10.6], [16.6, 6], [19.2, 6], [21.6, 10.6]]), [0, 1, 1, 0]);
  const body = rp(P([[3.6, 10.2], [27.4, 10.2], [27.4, 18], [3.6, 18]]), [2.2, 2.8, 2.2, 2.2]);
  return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${cabin}" fill="${u.loS}"/></g></g><path d="${cabin}" ${OL}/>
    <path d="${win}" fill="#fff"/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.upS}"/></g></g><path d="${body}" ${OL}/>
    ${wheel(u, 9.6, 18 + dy, 3.1)}${wheel(u, 21.4, 18 + dy, 3.1)}`;
}

/** A solid tyre with a white hub. */
export const wheel = (u, cx, cy, r) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${u.pure('#2F6FE0')}"/><circle cx="${f(cx)}" cy="${f(cy)}" r="1.2" ${WHITE}/>`;

/** A side view of an airliner facing right, round the origin: fuselage with tail fin, and wing. */
export const PLANE_SIDE = {
  body: rp([[-10.8, -2.2], [7, -2.2], [11.6, 0.2], [7, 2.4], [-9.4, 2.4]], [1, 2.2, 2, 2.2, 1.4])
    + rp([[-10.8, -1.2], [-9.6, -8], [-7, -8], [-4.4, -1.2]], [0, 0.8, 0.8, 0]),
  wing: rp([[-2.6, 0.4], [3.4, 0.4], [-1.4, 7.4], [-4.8, 7.4]], [0.6, 0.8, 1, 0.8])
};
