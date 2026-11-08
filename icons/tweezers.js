import { defineIcon, rp } from '../packages/core/src/kit.js';
import { live, setD } from './_b5-parts.js';

// Drawn along a vertical axis from the joined tail at y 0 to the tips at y 23, then laid on a diagonal.
const TILT = 32 * Math.PI / 180, MID = 11.5;
const place = ([x, y]) => [15.5 + x * Math.cos(TILT) - (y - MID) * Math.sin(TILT), 12.5 + x * Math.sin(TILT) + (y - MID) * Math.cos(TILT)];

/** Right-hand outline points from the tail to the tip, for belly half-width b and tip half-gap g. */
const side = (b, g) => ({
  outer: [[3, 0], [b, 15], [g + 2.2, 22]],
  inner: [[g + 0.02, 23], [b - 3.1, 14.4], [0, 4.6]]
});
const mirror = ([x, y]) => [-x, y];
const R_OUT = [2.8, 3, 0.5], R_IN = [0.4, 3, 1.4];

function whole(b, g) {
  const { outer, inner } = side(b, g);
  const left = [...inner.slice(0, 2).reverse().map(mirror), ...outer.slice().reverse().map(mirror)];
  return rp([...outer, ...inner, ...left].map(place), [...R_OUT, ...R_IN, 3, 0.4, 0.5, 3, 2.8]);
}
function leftArm(b, g) {
  const { outer, inner } = side(b, g);
  const pts = [[0, 0], [0, 4.6], ...inner.slice(0, 2).reverse().map(mirror), ...outer.slice().reverse().map(mirror)];
  return rp(pts.map(place), [0, 0, 3, 0.4, 0.5, 3, 2.8]);
}

export default defineIcon({
  name: 'tweezers',
  zh: '镊子',
  category: 'health',
  tags: ['forceps', 'pincers', 'pluck', 'splinter', 'lab tool', '夹子'],
  // Tweezers joined at a curved tail with tapered tips; on hover the arms flex in and the tips pinch shut.
  svg: (u) => `${live(u, 'b', u.loS)}${live(u, 'f', u.upS, false)}`,
  target: (h) => ({ w: h ? 5.4 : 7.2, g: h ? 0 : 2 }),
  draw(p, E) {
    setD(E, 'b', whole(p.w, p.g));
    setD(E, 'f', leftArm(p.w, p.g));
  }
});
