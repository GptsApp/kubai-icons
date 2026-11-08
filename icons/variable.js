import { defineIcon, f, rp } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Points along a circle arc, angles in degrees clockwise from east.
const arcPts = (cx, cy, r, a0, a1, n = 10) => Array.from({ length: n + 1 }, (_, i) => {
  const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
});
// A parenthesis: a band between two arcs, its ends rounded.
const pts = [...arcPts(17.4, 12.5, 11.6, 140, 220), ...arcPts(17.4, 12.5, 8.8, 220, 140)];
const PAREN = rp(pts, pts.map((_, i) => (i === 0 || i === 10 || i === 11 || i === 21 ? 1.2 : 0.2)));
const X = rp([[-3.6, -4.6], [0, -1.6], [3.6, -4.6], [5, -3], [1.6, 0], [5, 3], [3.6, 4.6], [0, 1.6], [-3.6, 4.6], [-5, 3], [-1.6, 0], [-5, -3]], [0.8, 0.3, 0.8, 0.8, 0.3, 0.8, 0.8, 0.3, 0.8, 0.8, 0.3, 0.8]);

export default defineIcon({
  name: 'variable',
  zh: '变量',
  category: 'development',
  tags: ['variable', 'parameter', 'value', 'function', 'formula', 'x', '参数'],
  // An x between parentheses; on hover the parentheses open out and the x turns over.
  svg: (u) => rig(u, 'l', [{ d: PAREN, fill: u.loS }]) + rig(u, 'r', [{ d: PAREN, fill: u.loS }]) + rig(u, 'x', [{ d: X, fill: u.upS }]),
  target: (h) => ({ s: h ? 1.2 : 0, a: h ? 90 : 0 }),
  draw(p, E) {
    pose(E, 'l', 1, `translate(${f(-p.s)} 0)`);
    pose(E, 'r', 1, `translate(${f(31 + p.s)} 0) scale(-1 1)`);
    pose(E, 'x', 1, `translate(15.5 12.5) rotate(${f(p.a)})`);
  }
});
