import { defineIcon, f, DEEP, rr, rp, rattle, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';
import { front } from './_commerce-charts.js';

const LOOP = rr(5, 1.2, 21, 10.8, 5.4);
const WRAP = 'M5 6.4C5 9.8 7.6 12.4 10.8 12.4H20.2C23.4 12.4 26 9.8 26 6.4Q21.8 8.6 15.5 8.6Q9.2 8.6 5 6.4Z';
// A tail ends in three fringe teeth.
const tail = (x, w, top, end) => {
  const s = w / 3, v = end - 2.8;
  return rp([[x, top], [x + w, top], [x + w, end], [x + s * 2.5, v], [x + s * 2, end], [x + s * 1.5, v], [x + s, end], [x + s / 2, v], [x, end]],
    [0.4, 0.4, 0.5, 0.3, 0.5, 0.3, 0.5, 0.3, 0.5]);
};
const REAR = tail(7.4, 8.6, 9, 21), FORE = tail(15, 8.6, 9, 24);
const stripe = (x, y) => `<path d="${rr(x, y, 8.6, 2.6, 0)}" ${DEEP}/>`;

export default defineIcon({
  name: 'scarf',
  zh: '围巾',
  category: 'commerce',
  tags: ['muffler', 'winter', 'clothing', 'neck', 'warm', 'knit', '冬装', '保暖'],
  variants: ['plus', 'check', 'heart'],
  // A scarf wound round the neck with two striped, fringed tails; on hover the tails sway in the wind.
  svg: (u) => `${layer(u, 'lp', LOOP, u.loS)}
    ${layer(u, 're', REAR, u.loS, { extra: stripe(7.4, 14) })}
    ${layer(u, 'fo', FORE, u.upS, { extra: stripe(15, 15.6) })}
    ${front(u, WRAP, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, ['re'], `rotate(${f(rattle(o, -13, 2))} 11.7 9)`);
    moveAll(E, ['fo'], `rotate(${f(rattle(o, 11, 3))} 19.3 9)`);
  }
});
