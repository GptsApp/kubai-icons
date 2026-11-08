import { defineIcon, KR, f, OL, DEEP, DEEPS, WHITES, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'luggage',
  zh: '行李箱',
  category: 'travel',
  tags: ['suitcase', 'baggage', 'trip', 'travel', 'trolley', '旅行箱'],
  variants: ['plus', 'check', 'x', 'clock', 'search', 'alert', 'lock'],
  // A wheeled suitcase; on hover its handle pulls out and it tips back onto its wheels.
  svg: (u) => {
    const body = rr(7.2, 5.6, 16.6, 16, KR);
    return `<g data-n="case">
      <path data-n="hd" fill="none" stroke-width="2.2" stroke-linejoin="round" ${DEEPS}/>
      <circle cx="10.8" cy="22.8" r="1.7" ${DEEP}/><circle cx="20.2" cy="22.8" r="1.7" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="M12.4 8.8V18.4M18.6 8.8V18.4" class="ln" ${WHITES}/></g>`;
  },
  target: (h) => ({ top: h ? 0.2 : 2.8, tilt: h ? -6 : 0 }),
  draw(p, E) {
    at(E.hd, { d: `M12.4 6.4V${f(p.top)}H18.6V6.4` });
    at(E.case, { transform: `rotate(${f(p.tilt)} 10.8 24.4)` });
  }
});
