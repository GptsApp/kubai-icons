import { defineIcon, f, WHITE, DEEPS, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';

const AIR = [5.2, 8.6, 12];

export default defineIcon({
  name: 'hair-dryer',
  zh: '吹风机',
  category: 'home',
  tags: ['blow dryer', 'hairdryer', 'salon', 'grooming', 'bathroom', 'hot air', '电吹风', '吹发', '风筒'],
  // A hair dryer from the side; it kicks back on hover as air streams from its nozzle.
  svg: (u) => {
    const nozzle = rp([[18, 4.6], [26.8, 5.8], [26.8, 11.4], [18, 12.6]], [0.4, 1.2, 1.2, 0.4]);
    const handle = rp([[9, 12], [15.2, 12], [13.6, 24], [7.8, 24]], [0, 0, 2.2, 2.2]);
    return `<path data-n="air" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="g">${front(u, handle)}${front(u, nozzle)}${back(u, rr(4.2, 2.2, 17.6, 12.8, 6))}
      <path d="${rr(11.2, 17, 0, 0, 0)}"/><path d="${rr(9.2, 7.2, 4.4, 2.8, 1.2)}" ${WHITE}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = 28 - 2.8 * o;
    at(E.g, { transform: `translate(${f(-2.8 * o)} 0)` });
    at(E.air, { d: AIR.map((y) => `M${f(x)} ${y}H${f(x + 4.2 * o)}`).join(''), opacity: o > 0.02 ? 1 : 0 });
  }
});
