import { defineIcon, f, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

// One coin seen from the side: a capsule 3.6 tall per step, so each coin covers the
// top of the one below and their outlines read as one line.
const slab = (x, y) => rr(x, y, 13, 4.6, 2.3);

export default defineIcon({
  name: 'coins',
  zh: '硬币堆',
  category: 'commerce',
  tags: ['money', 'cash', 'savings', 'stack', 'balance', '零钱'],
  variants: ['plus', 'minus', 'check', 'x', 'up', 'down', 'sync', 'clock'],
  // Two stacks of coins; on hover one more coin drops onto the front stack.
  svg: (u) => `${[16.8, 13.2, 9.6, 6].map((y) => back(u, slab(4.4, y), u.loS)).join('')}
    ${[16.8, 13.2].map((y) => back(u, slab(13.6, y), u.upS)).join('')}
    <g data-n="drop">${back(u, slab(13.6, 0), u.upS)}</g>`,
  target: (h) => ({ y: h ? 9.6 : 3.4, o: h ? 1 : 0 }),
  draw(p, E) { at(E.drop, { transform: `translate(0 ${f(p.y)})`, opacity: f(clamp01(p.o * 2)) }); }
});
