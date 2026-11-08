import { defineIcon, KR, f, OL, rp, rr, at } from '../packages/core/src/kit.js';
import { back } from './_interface.js';

const SIDE = rr(0, 0, 7, 13.6, KR), CARD = rr(9.2, 3.3, 12.6, 18.4, KR);

export default defineIcon({
  name: 'gallery-view',
  zh: '画廊视图',
  category: 'layout',
  tags: ['gallery', 'carousel', 'slides', 'photos', 'cover flow', '轮播'],
  // A carousel of photos; on hover the side photos slide out and the centre one comes forward.
  svg: (u) => `<g data-n="l">${back(u, SIDE)}</g><g data-n="r">${back(u, SIDE)}</g>
    <g data-n="c"><clipPath id="${u.id('ph')}"><path d="${CARD}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CARD}" fill="${u.upS}"/></g></g>
      <g clip-path="url(#${u.id('ph')})">
        <circle cx="18.2" cy="8.4" r="2.2" fill="#fff"/>
        <path d="${rp([[6, 24], [6, 20], [13.6, 13.4], [24, 21.4], [24, 24]], [0, 0, 1.6, 0, 0])}" fill="${u.pure('#5393FF')}"/>
      </g>
      <path d="${CARD}" ${OL}/></g>`,
  target: (h) => ({ dx: h ? 1.4 : 0, s: h ? 1.05 : 1 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(3.6 - p.dx)} 5.7)` });
    at(E.r, { transform: `translate(${f(20.4 + p.dx)} 5.7)` });
    at(E.c, { transform: `translate(15.5 12.5) scale(${f(p.s)}) translate(-15.5 -12.5)` });
  }
});
