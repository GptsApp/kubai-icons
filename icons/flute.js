import { defineIcon, f, DEEP, WHITE, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const TUBE = rr(1.6, 9.5, 27.8, 6, 2.4);
const HEAD = rr(1.6, 9.5, 8.2, 6, 2.4);
const KEYS = [13.2, 18, 22.8, 27];

export default defineIcon({
  name: 'flute',
  zh: '长笛',
  category: 'media',
  tags: ['woodwind', 'recorder', 'piccolo', 'instrument', 'orchestra', 'music', '笛子', '乐器'],
  // A flute held on a slant, with a lighter head joint and a row of keys; on hover it sways as the keys press in turn.
  svg: (u) => `<g data-n="g">${back(u, TUBE, u.loS)}${front(u, HEAD, u.upS)}
    <circle cx="5.6" cy="12.5" r="1.4" ${DEEP}/>
    ${KEYS.map((x, i) => `<circle data-n="k${i}" cx="${x}" cy="12.5" r="1.5" ${WHITE}/>`).join('')}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(-36 + rattle(o, 7, 2))} 15.5 12.5)` });
    KEYS.forEach((x, i) => at(E[`k${i}`], { r: f(1.5 - 0.6 * Math.sin(Math.PI * clamp01(o * 1.6 - i * 0.2))) }));
  }
});
