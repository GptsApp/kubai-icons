import { defineIcon, f, OL, circ, clamp01, at } from '../packages/core/src/kit.js';
import { sky, fall } from './_weather-nature.js';

const STONES = [[10, 20.8], [15.5, 23.2], [21, 20.8]];

export default defineIcon({
  name: 'cloud-hail',
  zh: '冰雹',
  category: 'weather',
  tags: ['hail', 'sleet', 'ice', 'storm', 'weather'],
  // Hailstones under a cloud; on hover they drop out and new ones fall from the cloud.
  svg: (u) => sky(u, STONES.map(([x, y], i) => `<g data-n="d${i}"><g filter="${u.hi}"><path d="${circ(x, y, 1.5)}" fill="${u.upS}"/></g><path d="${circ(x, y, 1.5)}" ${OL}/></g>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    STONES.forEach(([, y], i) => {
      const q = fall(o, y);
      at(E[`d${i}`], { transform: `translate(0 ${f(q.dy)})`, opacity: f(q.op) });
    });
  }
});
