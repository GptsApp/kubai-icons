import { defineIcon, f, DEEP, rp, clamp01, at, wave, bump } from '../packages/core/src/kit.js';
import { sky } from './_weather-nature.js';

const BOLT = rp([[16.2, 9.2], [9.6, 18], [14.2, 18], [12.2, 26.2], [21.6, 15], [16.8, 15], [19.8, 9.2]], [0.5, 0.6, 0.4, 0.6, 0.6, 0.4, 0.5]);

export default defineIcon({
  name: 'cloud-lightning',
  zh: '雷电',
  category: 'weather',
  tags: ['thunder', 'storm', 'lightning', 'thunderstorm', 'weather', '雷雨'],
  // A bolt strikes from a cloud; on hover it flashes a few times and settles.
  svg: (u) => sky(u, '', `<path data-n="bolt" d="${BOLT}" ${DEEP}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = wave(o, (t) => (1 - t) * Math.abs(Math.sin(3 * Math.PI * t)));
    at(E.bolt, { opacity: f(1 - 0.85 * k), transform: `translate(0 ${f(1.2 * bump(o))})` });
  }
});
