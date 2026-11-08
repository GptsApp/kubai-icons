import { defineIcon, CR, R, rp, rr } from '../packages/core/src/kit.js';
import { back, front, wheel, turn, setD } from './_b6-vehicles.js';

const HINGE = [20.8, 6.2], LID = R(4.8, 3.4, 16.8, 2.8);

export default defineIcon({
  name: 'camper-van',
  zh: '房车',
  category: 'transport',
  tags: ['camper', 'rv', 'motorhome', 'caravan', 'road trip', 'camping', '露营车'],
  // A motorhome with a roof panel; on hover the panel tips up at the rear on a tent wedge.
  svg: (u) => {
    const body = rp([[3.6, 5.8], [24.4, 5.8], [24.4, 10.6], [21.6, 10.6], [21.6, 18], [3.6, 18]], [2.2, 1.8, 1, 0, 0, 2.2]);
    const cab = rp([[19.6, 10.6], [24.4, 10.6], [27.4, 14.2], [27.4, 18], [19.6, 18]], [1.4, 1.8, 1.8, 2.2, 0]);
    return `<g transform="translate(0 0.4)">
      ${back(u, '', u.upS, 'w')}
      ${back(u, body, u.loS)}
      <path d="${rr(6, 8.4, 5.4, 4.4, CR) + rr(13.4, 8.4, 4.2, 4.4, CR)}" fill="#fff"/>
      ${back(u, cab, u.upS)}
      <path d="${rp([[21.8, 12.4], [23.4, 12.4], [25.2, 14.8], [21.8, 14.8]], [0.8, 0.8, 0.4, 0.6])}" fill="#fff"/>
      ${front(u, '', u.upS, 'l')}
      ${wheel(u, 8.6, 18, 2.8)}${wheel(u, 22.4, 18, 2.8)}</g>`;
  },
  target: (h) => ({ a: h ? 15 : 0 }),
  draw(p, E) {
    const lid = turn(LID, p.a, HINGE[0], HINGE[1]);
    setD(E, 'l', rp(lid, 1.2));
    setD(E, 'w', rp([[20.4, 6.2], lid[3], [5.4, 7.2]], 0.3));
  }
});
