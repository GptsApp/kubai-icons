import { defineIcon, f, DEEP, rr, circ, at, clamp01, wave } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

const WX = [7.3, 15.5, 23.7], WY = 19.9, WR = 3.6;

export default defineIcon({
  name: 'mars-rover',
  zh: '火星车',
  category: 'science',
  tags: ['rover', 'planetary rover', 'space exploration', 'curiosity', 'space', '探测车', '火星探测'],
  // A six-wheeled rover with a tall camera mast; on hover it rolls forward, each wheel riding over the ground, and the camera looks ahead.
  svg: (u) => `<g data-n="g">
    ${WX.map((x, i) => `<path data-n="w${i}" d="${circ(x, WY, WR)}" ${DEEP}/>`).join('')}
    <path d="${rr(18.2, 4, 2.8, 9, 0)}" ${DEEP}/>
    ${solid(u, rr(4.6, 11, 21.8, 5.2, 2), u.loS)}
    <g data-n="h">${solid(u, rr(14, 1, 11.2, 5, 1.6), u.upS)}<circle data-n="ey" cy="3.5" r="1.4" ${DEEP}/></g></g>`,
  target: (h) => ({ x: h ? 0.8 : -0.6, o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(${f(p.x)} 0)` });
    const o = clamp01(p.o);
    WX.forEach((_, i) => at(E[`w${i}`], { transform: `translate(0 ${f(-wave(o, (t) => 1.3 * Math.sin(Math.PI * clamp01(t * 2 - (2 - i) * 0.5))))})` }));
    at(E.ey, { cx: f(19 + 3.4 * o) });
  }
});
