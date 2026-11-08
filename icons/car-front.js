import { defineIcon, KR, f, OL, DEEP, DEEPS, R, rp, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'car-front',
  zh: '汽车正面',
  category: 'transport',
  tags: ['car', 'vehicle', 'automobile', 'drive', 'headlights', '车辆'],
  variants: ['plus', 'check', 'x', 'lock'],
  // A car seen from the front; on hover its headlights come on and it dips on its springs.
  svg: (u) => {
    const cabin = rp([[7.6, 11.6], [9.8, 3.4], [21.2, 3.4], [23.4, 11.6]], [0, 2, 2, 0]);
    const glass = rp([[10.4, 11.4], [11.9, 5.8], [19.1, 5.8], [20.6, 11.4]], [0, 1.2, 1.2, 0]);
    const body = rr(4, 11, 23, 8.6, KR), tyres = rp(R(6.2, 17, 4.4, 5.6), [0, 0, 1.3, 1.3]) + rp(R(20.4, 17, 4.4, 5.6), [0, 0, 1.3, 1.3]);
    return `<path d="${tyres}" fill="${u.pure('#2F6FE0')}"/>
      <g data-n="car">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cabin}" fill="${u.loS}"/></g></g><path d="${cabin}" ${OL}/>
      <path d="${glass}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.upS}"/></g></g><path d="${body}" ${OL}/>
      <circle cx="8.8" cy="15.2" r="2" ${DEEP}/><circle cx="22.2" cy="15.2" r="2" ${DEEP}/>
      <g data-n="lit"><circle cx="8.8" cy="15.2" r="1.25" fill="#fff"/><circle cx="22.2" cy="15.2" r="1.25" fill="#fff"/></g>
      <path d="M13 15.2H18" class="ln" ${DEEPS}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.lit, { opacity: f(clamp01(o * 2)) });
    at(E.car, { transform: `translate(0 ${f(rattle(o, 0.9, 2))})` });
  }
});
