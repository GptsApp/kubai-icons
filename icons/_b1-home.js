// Shared pieces for the furniture and bathroom icons: layered bodies and placed polygons.
import { OL, at, f } from '../packages/core/src/kit.js';

const layer = (u, d, fill) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" fill="${fill}"/></g></g><path d="${d}" ${OL}/>`;
const liveLayer = (u, n, fill) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="${n}" fill="${fill}"/></g></g><path data-n="${n}O" ${OL}/>`;

/** A mid-tone body with shadow, top glow and outline. */
export const back = (u, d) => layer(u, d, u.loS);
/** A light front piece with shadow, top glow and outline. */
export const front = (u, d) => layer(u, d, u.upS);
/** A light piece with top glow and outline but no shadow, for parts close over open space. */
export const flat = (u, d) => `<g filter="${u.hi}"><path d="${d}" fill="${u.upS}"/></g><path d="${d}" ${OL}/>`;
/** The same layers with no path yet: draw() fills them in through setPath. */
export const liveBack = (u, n) => liveLayer(u, n, u.loS);
export const liveFront = (u, n) => liveLayer(u, n, u.upS);
/** Writes one path to a live layer's fill and outline. */
export const setPath = (E, n, d) => { at(E[n], { d }); at(E[`${n}O`], { d }); };

/** Turns points by deg about the origin, then moves them to (x, y). */
export const place = (pts, deg, x = 0, y = 0) => {
  const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return pts.map(([px, py]) => [f(px * c - py * s + x), f(px * s + py * c + y)]);
};
