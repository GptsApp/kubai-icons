import { defineIcon, KR, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'battery-charging',
  zh: '电池',
  category: 'devices',
  tags: ['battery', 'charge', 'power', 'energy'],
  variants: ['alert'],
  // A battery that charges from low to nearly full on hover.
  svg: (u) => {
    const body = rr(3.6, 6.4, 21.6, 12.2, KR), nub = rp(R(24.6, 10, 2.8, 5), [0, 1.2, 1.2, 0]);
    return `<g filter="${u.sh}"><path d="${nub}" fill="${u.loS}"/></g><path d="${nub}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(5.8, 8.6, 17.2, 7.8, 1.2)}" fill="#fff"/>
      <path data-n="lvl" ${DEEP}/>`;
  },
  target: (h) => ({ w: h ? 14.4 : 5.4 }),
  draw(p, E) { at(E.lvl, { d: rr(7.2, 10, p.w, 5, 0.8) }); }
});
