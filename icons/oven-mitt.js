import { defineIcon, f, KR, WHITE, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid, light, lick } from './_b2-kitchen.js';

const MAIN = 'M11.4 18V8.2C11.4 4 14 1.2 18 1.2C22 1.2 24.6 4 24.6 8.2V18Z';
const THUMB = 'M12.4 15.6C9.4 15 5.8 12.4 4.8 9.4C4.2 7.2 5.2 5.6 6.8 5.2C8.6 4.8 9.6 5.8 10.4 7.4C11 8.8 12 10 12.6 10.4Z';

export default defineIcon({
  name: 'oven-mitt',
  zh: '隔热手套',
  category: 'home',
  tags: ['oven glove', 'pot holder', 'hot', 'baking', 'kitchen', 'heat', '烤箱手套'],
  variants: [],
  // A padded mitt with a thumb and a flame on the back; on hover the thumb squeezes to grip.
  svg: (u) => `<g data-n="g"><g data-n="th">${solid(u, THUMB)}</g>${solid(u, MAIN)}
      <path d="${lick(18, 15.6, 1.02)}" ${WHITE}/>${light(u, rr(9.6, 17, 16.6, 7, KR))}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(rattle(o, 5, 2))} 18 24)` });
    at(E.th, { transform: `rotate(${f(Math.abs(rattle(o, 24, 3)))} 12.4 14.6)` });
  }
});
