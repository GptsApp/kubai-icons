import { defineIcon, f, OL, star, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'star',
  zh: '星标',
  category: 'interface',
  tags: ['favorite', 'rating', 'like', 'featured'],
  // A star with a lighter star inset; it turns one point on hover.
  svg: (u) => {
    const big = star(11.6, 5.4), small = star(5.6, 2.6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r1"><path d="${big}" fill="${u.loS}"/></g></g></g>
      <g data-n="r1o"><path d="${big}" ${OL}/></g>
      <g filter="${u.hi}"><g data-n="r2"><path d="${small}" fill="${u.upS}"/></g></g>
      <g data-n="r2o"><path d="${small}" ${OL}/></g>`;
  },
  target: (h) => ({ rot: h ? 72 : 0, s: h ? 1.05 : 1 }),
  draw(p, E) {
    const t = `translate(15.5 13.4) rotate(${f(p.rot)}) scale(${f(p.s)})`;
    ['r1', 'r1o', 'r2', 'r2o'].forEach((n) => at(E[n], { transform: t }));
  }
});
