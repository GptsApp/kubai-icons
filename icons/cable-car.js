import { defineIcon, CR, f, DEEPS, R, rp, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

// The cable climbs to the right; the cabin hangs from (15.5, 3) on it.
const SLOPE = -3.2 / 25.4;

export default defineIcon({
  name: 'cable-car',
  zh: '缆车',
  category: 'transport',
  tags: ['gondola', 'cable car', 'ropeway', 'ski lift', 'mountain', 'aerial tram', '索道'],
  variants: ['check', 'clock'],
  // A gondola hanging from its cable; on hover it rides up the cable, swinging, and settles.
  svg: (u) => `<path d="M2.8 4.6L28.2 1.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g data-n="g"><path d="M15.5 3V8.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rr(7.4, 8.4, 16.2, 14.2, 3), u.loS)}
      <path d="${rr(9.6, 10.8, 11.8, 5, CR)}" fill="#fff"/>
      ${front(u, rp(R(7.4, 17.6, 16.2, 5), [1.6, 1.6, 3, 3]), u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), dx = 1.8 * o;
    at(E.g, { transform: `translate(${f(dx)} ${f(dx * SLOPE)}) rotate(${f(rattle(o, 7, 2))} 15.5 3)` });
  }
});
