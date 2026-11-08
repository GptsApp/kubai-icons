import { defineIcon, f, OL, DEEP, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { carSide } from './_travel-transport.js';

export default defineIcon({
  name: 'taxi',
  zh: '出租车',
  category: 'transport',
  tags: ['cab', 'ride', 'hail', 'car', 'ride-hailing', '打车'],
  variants: ['plus', 'check', 'x', 'clock'],
  // A car with a roof sign; on hover the sign lights up and the car bobs as it pulls up.
  svg: (u) => {
    const sign = rr(12.2, 1.6, 7, 3.8, 1.2);
    return `<g data-n="car"><path d="${sign}" ${DEEP}/><path data-n="lit" d="${rr(13.4, 2.6, 4.6, 2, 0.8)}" fill="#fff"/><path d="${sign}" ${OL}/>
      ${carSide(u, 1.2)}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.lit, { opacity: f(o) });
    at(E.car, { transform: `translate(0 ${f(rattle(o, 0.8, 2))})` });
  }
});
