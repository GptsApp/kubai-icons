import { defineIcon, f, DEEPS, clamp01, at } from '../packages/core/src/kit.js';
import { sky, fall } from './_weather-nature.js';

const DROPS = [[10.2, 21.6], [15.6, 22.6], [21, 21.6]];

export default defineIcon({
  name: 'cloud-rain',
  zh: '下雨',
  category: 'weather',
  tags: ['rain', 'rainy', 'shower', 'weather', '雨天'],
  // Rain slants down from a cloud; on hover the drops fall away and new ones come out of the cloud.
  svg: (u) => sky(u, DROPS.map(([x, y], i) => `<path data-n="d${i}" d="M${f(x + 1)} ${f(y - 2.1)}L${f(x - 1)} ${f(y + 2.1)}" fill="none" stroke-width="2.6" stroke-linecap="round" ${DEEPS}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    DROPS.forEach(([, y], i) => {
      const q = fall(o, y);
      at(E[`d${i}`], { transform: `translate(${f(-0.47 * q.dy)} ${f(q.dy)})`, opacity: f(q.op) });
    });
  }
});
