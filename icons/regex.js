import { defineIcon, f, rp, rr } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// A six-armed asterisk centred on the origin: arms of half-width W reaching out to L.
const W = 1.35, L = 6.6;
const ASTER = (() => {
  const pts = [], rad = (d) => d * Math.PI / 180, tip = Math.hypot(L, W), off = Math.atan2(W, L);
  for (let i = 0; i < 6; i++) {
    const a = rad(-90 + i * 60);
    pts.push([tip * Math.cos(a - off), tip * Math.sin(a - off)], [tip * Math.cos(a + off), tip * Math.sin(a + off)]);
    pts.push([2 * W * Math.cos(a + rad(30)), 2 * W * Math.sin(a + rad(30))]);
  }
  return rp(pts, pts.map((_, i) => (i % 3 === 2 ? 0.4 : 1.2)));
})();
const DOT = rr(5.4, 15, 7, 7, 1.8);

export default defineIcon({
  name: 'regex',
  zh: '正则表达式',
  category: 'development',
  tags: ['regular expression', 'pattern', 'match', 'search', 'wildcard', '正则', '通配符'],
  // The dot and star of a regular expression; on hover the star spins round one arm.
  svg: (u) => rig(u, 'd', [{ d: DOT, fill: u.upS }]) + rig(u, 's', [{ d: ASTER, fill: u.loS }]),
  target: (h) => ({ a: h ? 60 : 0 }),
  draw(p, E) { pose(E, 's', 1, `translate(19.2 9.2) rotate(${f(p.a)})`); }
});
