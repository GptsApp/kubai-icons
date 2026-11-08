import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';

// A shoe print in its own frame: the sole above, the heel below, 2 units of clear space between.
const oval = (cx, cy, rx, ry, a) => {
  const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
  const p = [cx - rx * c, cy - rx * s], q = [cx + rx * c, cy + rx * s];
  return `M${f(p[0])} ${f(p[1])}A${rx} ${ry} ${a} 1 0 ${f(q[0])} ${f(q[1])}A${rx} ${ry} ${a} 1 0 ${f(p[0])} ${f(p[1])}Z`;
};
const PRINT = (tilt) => oval(0, 0, 4, 5.6, tilt) + oval(0.7 * Math.sign(-tilt), 9.9, 3.1, 2.4, tilt);

export default defineIcon({
  name: 'footprints',
  zh: '足迹',
  category: 'people',
  tags: ['steps', 'walk', 'trail', 'track', 'history', 'path', '脚印'],
  // Two footprints, left behind right; on hover the left foot steps forward.
  svg: (u) => `<g data-n="l"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PRINT(-8)}" fill="${u.loS}"/></g></g><path d="${PRINT(-8)}" ${OL}/></g>
    <g data-n="r"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PRINT(8)}" fill="${u.upS}"/></g></g><path d="${PRINT(8)}" ${OL}/></g>`,
  target: (h) => ({ l: h ? -2.4 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(9.6 ${f(12 + p.l)})` });
    at(E.r, { transform: `translate(21.4 6.6)` });
  }
});
