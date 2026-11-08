import { defineIcon, f, DEEP, clamp01, at } from '../packages/core/src/kit.js';
import { sky, fall } from './_weather-nature.js';

const FLAKES = [[10, 20.8], [15.5, 23.4], [21, 20.8]];

export default defineIcon({
  name: 'cloud-snow',
  zh: '下雪',
  category: 'weather',
  tags: ['snow', 'snowy', 'winter', 'weather', '雪天'],
  // Snow under a cloud; on hover the flakes drift down, swaying, and fresh ones follow.
  svg: (u) => sky(u, FLAKES.map(([x, y], i) => `<circle data-n="d${i}" cx="${x}" cy="${y}" r="1.9" ${DEEP}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    FLAKES.forEach(([, y], i) => {
      const q = fall(o, y);
      at(E[`d${i}`], { transform: `translate(${f(0.9 * Math.sin(q.dy * 0.9))} ${f(q.dy)})`, opacity: f(q.op) });
    });
  }
});
