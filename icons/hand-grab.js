import { defineIcon, f, rr, rp, at } from '../packages/core/src/kit.js';
import { back, front } from './_interface.js';

// Curled fingers, index to little: left edge and resting top.
const KNUCKLES = [[8.8, 5.6], [12.8, 4.6], [16.8, 5], [20.8, 6.4]];

export default defineIcon({
  name: 'hand-grab',
  zh: '抓取',
  category: 'interface',
  tags: ['grab', 'drag', 'pan', 'fist', 'hold', 'move', 'grabbing', '拖拽', '抓手'],
  // A hand closed round something, fingers curled over the palm; on hover it grips tighter, the knuckles drawing down.
  svg: (u) => `${KNUCKLES.map((_, i) => `<g data-n="k${i}">${back(u, rr(0, 0, 4, 10, 2))}</g>`).join('')}
    ${back(u, rp([[3.8, 13.6], [7.2, 11.4], [10.6, 16.6], [7.8, 19.2]], [1.7, 1.7, 1.2, 1.2]))}
    ${front(u, rp([[7.4, 11.6], [26.2, 11.6], [26.2, 17.8], [21.4, 23.6], [11.6, 23.6], [7.4, 18.4]], [2, 2, 3, 1.6, 1.6, 3]))}`,
  target: (h) => ({ y: h ? 2 : 0 }),
  draw(p, E) { KNUCKLES.forEach(([x, y], i) => at(E['k' + i], { transform: `translate(${x} ${f(y + p.y * (0.7 + 0.15 * i))})` })); }
});
