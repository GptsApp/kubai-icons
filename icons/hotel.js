import { defineIcon, KR, CR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

const WIN = [8.8, 13.8, 18.8].flatMap((x) => [4.2, 9.2].map((y) => rr(x, y, 3.4, 3.4, 0.9))).join('');

export default defineIcon({
  name: 'hotel',
  zh: '酒店',
  category: 'travel',
  tags: ['hotel', 'lodging', 'stay', 'accommodation', 'building', '住宿'],
  variants: ['plus', 'check', 'x', 'search', 'heart', 'star'],
  // A hotel with a canopy over its glass doors; on hover the doors slide fully apart.
  svg: (u) => {
    const body = rr(6.4, 1.4, 18.2, 22.2, KR), door = rp(R(12.6, 17, 5.8, 6.6), [CR, CR, 0, 0]);
    const cano = rr(10.2, 14.6, 10.6, 2.8, 1.4);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${WIN}" fill="#fff"/>
      <path d="${door}" fill="${u.pure('#2F6FE0')}"/>
      <clipPath id="${u.id('dr')}"><path d="${door}"/></clipPath>
      <g clip-path="url(#${u.id('dr')})"><path data-n="l" fill="#fff"/><path data-n="r" fill="#fff"/></g>
      <g filter="${u.hi}"><path d="${cano}" fill="${u.upS}"/></g><path d="${cano}" ${OL}/>`;
  },
  target: (h) => ({ w: h ? 0 : 2.7 }),
  draw(p, E) {
    at(E.l, { d: rp(R(12.6, 16, p.w, 8), 0) });
    at(E.r, { d: rp(R(18.4 - p.w, 16, p.w, 8), 0) });
  }
});
