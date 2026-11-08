import { defineIcon, circ, rp, rr, clamp01, at, DEEP } from '../packages/core/src/kit.js';
import { back, wheel, setD, drive, puff } from './_b6-vehicles.js';

export default defineIcon({
  name: 'tractor',
  zh: '拖拉机',
  category: 'transport',
  tags: ['farm', 'farming', 'agriculture', 'field', 'plough', '农机', '农业'],
  // A farm tractor with a big rear wheel; on hover it rolls forward and a puff of smoke
  // leaves the exhaust.
  svg: (u) => {
    const cab = rp([[6.4, 2.6], [16, 2.6], [18, 11.6], [6.4, 11.6]], [1.8, 1.6, 0, 0]);
    return `<g data-n="t">${puff(u, 'p')}
      <path d="${rr(20.4, 5.4, 2.6, 7, 1)}" fill="${u.pure('#2F6FE0')}"/>
      ${back(u, cab, u.loS)}
      <path d="${rp([[8.6, 4.8], [14.4, 4.8], [15.7, 11], [8.6, 11]], [1, 0.8, 0, 0])}" fill="#fff"/>
      ${back(u, rr(4.4, 11.2, 23, 7.8, 2.2), u.upS)}
      <circle cx="9.8" cy="17.2" r="6.4" fill="${u.pure('#2F6FE0')}"/>
      <circle cx="9.8" cy="17.2" r="3.2" fill="#fff"/><circle cx="9.8" cy="17.2" r="1.3" ${DEEP}/>
      ${wheel(u, 23.2, 20, 3.6)}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0, p: h ? [24.4, 1.4, 2.2] : [21.7, 7.4, 0.6] }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.t, { transform: drive(o, 9.8, 23.6) });
    setD(E, 'p', circ(p.p[0], p.p[1], p.p[2]));
  }
});
