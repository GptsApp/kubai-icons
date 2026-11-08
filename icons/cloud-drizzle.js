import { defineIcon, f, DEEPS, clamp01, at } from '../packages/core/src/kit.js';
import { sky, fall } from './_weather-nature.js';

const DROPS = [[10.4, 20.6], [15.5, 20.6], [20.6, 20.6], [12.95, 24.2], [18.05, 24.2]];

export default defineIcon({
  name: 'cloud-drizzle',
  zh: '小雨',
  category: 'weather',
  tags: ['drizzle', 'light rain', 'shower', 'weather', '毛毛雨'],
  // Short drizzle drops under a cloud; on hover they fall away and the cloud lets out more.
  svg: (u) => sky(u, DROPS.map(([x, y], i) => `<path data-n="d${i}" d="M${f(x)} ${f(y - 0.6)}V${f(y + 0.6)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    DROPS.forEach(([, y], i) => {
      const q = fall(o, y);
      at(E[`d${i}`], { transform: `translate(0 ${f(q.dy)})`, opacity: f(q.op) });
    });
  }
});
