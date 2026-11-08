import { defineIcon, f, OL, rr, at, wave, clamp01 } from '../packages/core/src/kit.js';
import { drippy } from './_home-food.js';
import { solid, light } from './_b2-kitchen.js';

export default defineIcon({
  name: 'pancake',
  zh: '煎饼',
  category: 'food',
  tags: ['breakfast', 'brunch', 'stack', 'syrup', 'butter', 'hotcake', '松饼', '早餐'],
  variants: [],
  // A stack of pancakes with syrup and butter; on hover the top one is tossed and lands.
  svg: (u) => {
    const butter = rr(12.2, 2.2, 6.6, 5.2, 1.2);
    const syrup = drippy(6.6, 24.4, 6.8, 9.4, [{ x: 10, w: 2.6, d: 2.8 }, { x: 20.6, w: 2.6, d: 4 }], 2.2);
    return `${solid(u, rr(4, 17.2, 23, 5.6, 2.8))}${solid(u, rr(5.4, 12, 20.2, 5.6, 2.8))}
      <g data-n="top">${solid(u, rr(4.4, 6.8, 22.2, 5.6, 2.8))}${light(u, syrup)}<path d="${butter}" fill="#fff"/><path d="${butter}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const y = wave(o, (t) => -5 * Math.sin(Math.PI * t)), a = wave(o, (t) => 14 * Math.sin(2 * Math.PI * t));
    at(E.top, { transform: `translate(0 ${f(y)}) rotate(${f(a)} 15.5 9.6)` });
  }
});
