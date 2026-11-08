import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, scaleAt, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'train',
  zh: '火车',
  category: 'transport',
  tags: ['railway', 'rail', 'metro', 'subway', 'locomotive', 'high-speed rail', '高铁', '地铁'],
  variants: ['check', 'clock', 'alert'],
  // A train seen head-on; on hover its lamps light and it draws nearer.
  svg: (u) => {
    const body = rr(7, 1.2, 17, 19.4, 4.4), front = rp(R(7, 12.4, 17, 8.2), [1.6, 1.6, 4.4, 4.4]);
    return `<path d="M11.2 21L8.6 23.8M19.8 21L22.4 23.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="tr">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(9.6, 3.8, 11.8, 6.4, 1.6)}" fill="#fff"/>
      <g filter="${u.hi}"><path d="${front}" fill="${u.upS}"/></g><path d="${front}" ${OL}/>
      <circle cx="11" cy="16.4" r="1.9" ${DEEP}/><circle cx="20" cy="16.4" r="1.9" ${DEEP}/>
      <g data-n="lit"><circle cx="11" cy="16.4" r="1.2" fill="#fff"/><circle cx="20" cy="16.4" r="1.2" fill="#fff"/></g></g>`;
  },
  target: (h) => ({ s: h ? 1.06 : 1, lit: h ? 1 : 0 }),
  draw(p, E) {
    at(E.tr, { transform: scaleAt(p.s, 15.5, 21) });
    at(E.lit, { opacity: f(p.lit) });
  }
});
