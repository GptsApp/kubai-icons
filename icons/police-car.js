import { defineIcon, f, DEEP, R, rp, rr, star, clamp01, at, wave } from '../packages/core/src/kit.js';
import { front, carSide, drive } from './_b6-vehicles.js';

const L = rp(R(10, 1.4, 5.5, 4.2), [1.2, 0, 0, 1.2]), Q = rp(R(15.5, 1.4, 5.5, 4.2), [0, 1.2, 1.2, 0]);

export default defineIcon({
  name: 'police-car',
  zh: '警车',
  category: 'transport',
  tags: ['patrol', 'cop', 'squad car', 'siren', 'law enforcement', '巡逻', '110'],
  // A patrol car with a star on its door and a light bar; on hover it rolls forward and
  // the two lamps flash in turn.
  svg: (u) => `<g data-n="t">${front(u, rr(10, 1.4, 11, 4.2, 1.2), u.upS)}
    <path data-n="a" d="${L}" ${DEEP}/><path data-n="b" d="${Q}" ${DEEP}/>
    ${carSide(u, 1.6)}
    <path transform="translate(15.5 15.4)" d="${star(3, 1.4)}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), v = wave(o, (t) => 0.5 + 0.5 * Math.cos(3 * Math.PI * t));
    at(E.a, { opacity: f(v) }); at(E.b, { opacity: f(1 - v) });
    at(E.t, { transform: drive(o, 9.6, 22.7) });
  }
});
