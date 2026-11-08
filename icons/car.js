import { defineIcon, f, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { carSide } from './_travel-transport.js';

export default defineIcon({
  name: 'car',
  zh: '汽车',
  category: 'transport',
  tags: ['automobile', 'vehicle', 'drive', 'auto', 'ride', '轿车', '开车'],
  variants: ['plus', 'check', 'x', 'clock', 'search', 'lock', 'alert'],
  // A car seen from the side; on hover it rolls forward, rocks back on its springs and
  // settles.
  svg: (u) => `<g data-n="car">${carSide(u)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const x = -0.6 + 1.4 * o + rattle(o, 0.9, 1);
    const tilt = rattle(o, -2.2, 2);
    at(E.car, { transform: `translate(${f(x)} 0) rotate(${f(tilt)} 9.6 21)` });
  }
});
