import { defineIcon, KR, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'chart-bar',
  zh: '图表',
  category: 'charts',
  tags: ['chart', 'graph', 'statistics', 'analytics', 'bars'],
  variants: ['plus', 'check', 'x', 'up', 'down', 'search', 'sparkle', 'cog'],
  // A bar chart whose bars rise and fall to new values on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(5.2, 2.2, 20.6, 20.6, KR)}" fill="${u.loS}"/></g></g>
    <path d="${rr(5.2, 2.2, 20.6, 20.6, KR)}" ${OL}/>
    <path data-n="b1" fill="#fff"/><path data-n="b2" fill="#fff"/><path data-n="b3" fill="#fff"/>`,
  target: (h) => ({ hgt: h ? [10, 5.4, 13.4] : [5.4, 10.6, 7.6] }),
  draw(p, E) {
    [8.4, 13.7, 19].forEach((x, i) => {
      const hh = p.hgt[i];
      at(E['b' + (i + 1)], { d: rp(R(x, 20 - hh, 3.6, hh), [1, 1, 0.4, 0.4]) });
    });
  }
});
