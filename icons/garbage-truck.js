import { DEEP, defineIcon, KR, R, rp, at } from '../packages/core/src/kit.js';
import { back, front, wheel, turn, shift } from './_b6-vehicles.js';

const BIN = [[3.8, 12.4], [10, 12.4], [9.4, 20.4], [4.4, 20.4]], LID = R(3.2, 10.6, 7.4, 2.8);
const AX = 10, AY = 12.4;

export default defineIcon({
  name: 'garbage-truck',
  zh: '垃圾车',
  category: 'transport',
  tags: ['trash', 'refuse', 'waste', 'dustcart', 'sanitation', 'recycling', '环卫'],
  // A square refuse truck with a rear door and a wheelie bin at its tail; on hover the bin is hoisted and tipped in.
  svg: (u) => {
    const box = rp(R(10.2, 3.4, 11.8, 14.2), [1, KR, 0, 1]);
    const door = rp(R(6.4, 3.4, 5, 14.2), [KR, 0.6, 0.6, 1]);
    const cab = rp([[21, 7.4], [23.8, 7.4], [27.4, 11.6], [27.4, 17.6], [21, 17.6]], [1.6, 1.8, 1.8, 2.2, 0]);
    return `${back(u, box, u.loS)}${back(u, cab, u.upS)}${front(u, door, u.upS)}
      <path d="${rp([[22.9, 9.4], [23.9, 9.4], [25.6, 11.9], [22.9, 11.9]], [0.8, 0.8, 0.4, 0.6])}" fill="#fff"/>
      ${wheel(u, 14.4, 17.6, 2.8)}${wheel(u, 23.8, 17.6, 2.8)}
      <path data-n="b" ${DEEP}/><path data-n="l" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 58 : 0, x: h ? 4.4 : 0, y: h ? -5 : 0 }),
  draw(p, E) {
    const P = (pts, r) => rp(shift(turn(pts, p.a, AX, AY), p.x, p.y), r);
    at(E.b, { d: P(BIN, [0, 0, 1.2, 1.2]) }); at(E.l, { d: P(LID, 1.2) });
  }
});
