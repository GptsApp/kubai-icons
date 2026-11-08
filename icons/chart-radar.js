import { defineIcon, KR, OL, rp, at } from '../packages/core/src/kit.js';
import { solid, ngon } from './_w2-dev.js';

const HEX = rp(ngon(6, 11.6), KR), WEB = rp(ngon(6, 8.6), 1.2);

export default defineIcon({
  name: 'chart-radar',
  zh: '雷达图',
  category: 'charts',
  tags: ['radar', 'spider chart', 'web', 'skills', 'compare', 'chart', '蛛网图'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A radar chart on a hexagonal web; on hover the plotted shape reaches out to new scores.
  svg: (u) => `${solid(u, HEX, u.loS)}<path d="${WEB}" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="d" fill="${u.upS}"/></g><path data-n="dO" ${OL}/>`,
  target: (h) => ({ v: h ? [5.4, 8.4, 4.4, 8.4, 3.6, 5.2] : [8.4, 5.2, 8.4, 3.6, 5.6, 4.4] }),
  draw(p, E) {
    const pts = p.v.map((r, i) => ngon(6, r, 15.5, 12.5, i * 60)[0]);
    const d = rp(pts, 0.8);
    at(E.d, { d }); at(E.dO, { d });
  }
});
