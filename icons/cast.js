import { defineIcon, f, DEEP, DEEPS, CR, at } from '../packages/core/src/kit.js';
import { solid, arcPath, span } from './_devices.js';

// The screen has its lower left corner cut away round the corner of the waves.
const SCREEN = 'M4 9V5.5Q4 3.3 6.2 3.3H24.8Q27 3.3 27 5.5V19.5Q27 21.7 24.8 21.7H16.6A11.6 11.6 0 0 0 4 9Z';

export default defineIcon({
  name: 'cast',
  zh: '投屏',
  category: 'devices',
  tags: ['screen mirroring', 'airplay', 'chromecast', 'stream', 'tv', '镜像'],
  variants: ['check', 'x', 'alert'],
  off: true,
  // A screen with casting waves in its corner; on hover the waves light up from the corner out.
  svg: (u) => `${solid(u, SCREEN, u.loS)}
      <circle cx="5.6" cy="20.1" r="1.7" ${DEEP}/>
      <path data-n="w1" d="${arcPath(5, 20.7, 4.4, 0, 90)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" d="${arcPath(5, 20.7, 8, 0, 90)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.w1, { opacity: f(0.3 + 0.7 * span(p.o, 0, 0.5)) });
    at(E.w2, { opacity: f(0.3 + 0.7 * span(p.o, 0.35, 0.85)) });
  }
});
