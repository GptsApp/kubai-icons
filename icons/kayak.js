import { defineIcon, f, OL, DEEPS, rp, circ, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const HULL = 'M2.4 13.6Q15.5 26.4 28.6 13.6Q15.5 18.2 2.4 13.6Z';
const TORSO = rp([[12.8, 16.4], [12.8, 10.2], [18.2, 10.2], [18.2, 16.4]], [0, 2.6, 2.6, 0]);
const BLADE = (x) => rp([[x - 1.6, -2.6], [x + 1.6, -2.6], [x + 1.6, 2.6], [x - 1.6, 2.6]], 1.4);

export default defineIcon({
  name: 'kayak',
  zh: '皮划艇',
  category: 'sports',
  tags: ['kayak', 'canoe', 'paddle', 'rowing', 'water sport', 'boat', '划船'],
  // A paddler in a kayak; on hover the paddle dips on one side, then the other.
  svg: (u) => `${back(u, TORSO, u.loS)}${back(u, circ(15.5, 5.6, 2.9), u.loS)}
    ${back(u, HULL, u.loS)}
    <g data-n="pd"><path d="M-8.4 0H8.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${front(u, BLADE(-9.6) + BLADE(9.6), u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.pd, { transform: `translate(15.5 12.6) rotate(${f(-20 + rattle(clamp01(p.o), 40, 2))})` });
  }
});
