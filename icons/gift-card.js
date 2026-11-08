import { defineIcon, KR, f, OL, DEEP, WHITES, rr, circ, lines, at } from '../packages/core/src/kit.js';

const CARD = rr(4, 5.4, 23, 16, KR);
const BOW = circ(8.6, 5.2, 2.4) + circ(13.8, 5.2, 2.4);

export default defineIcon({
  name: 'gift-card',
  zh: '礼品卡',
  category: 'commerce',
  tags: ['gift card', 'voucher', 'coupon', 'present', 'reward', 'redeem', '代金券'],
  variants: ['plus', 'check', 'clock', 'heart'],
  // A card tied with a ribbon and bow; on hover it tips up as if handed over.
  svg: (u) => `<g data-n="c">
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CARD}" fill="${u.loS}"/></g></g><path d="${CARD}" ${OL}/>
    <path d="${rr(9.9, 5.4, 2.6, 16, 0)}" fill="#fff"/>
    <path d="${lines(16, 13.6, [7.6, 4.6])}" class="ln" ${WHITES}/>
    <g filter="${u.hi}"><path d="${BOW}" fill="${u.upS}"/></g><path d="${BOW}" ${OL}/>
    <path d="${rr(9.6, 3.9, 3.2, 3.2, 1)}" ${DEEP}/></g>`,
  target: (h) => ({ a: h ? -6 : 0, y: h ? -0.8 : 0 }),
  draw(p, E) { at(E.c, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 13.4)` }); }
});
