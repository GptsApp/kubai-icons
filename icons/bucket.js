import { defineIcon, f, DEEPS, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';

export default defineIcon({
  name: 'bucket',
  zh: '水桶',
  category: 'home',
  tags: ['pail', 'water', 'clean', 'housework', 'carry', '桶', '提桶', '清洁'],
  // A pail with a bail handle; it swings from the handle on hover as if being carried.
  svg: (u) => `<g data-n="g">
      <path d="M6.2 9C6.2 -1.6 24.8 -1.6 24.8 9" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rp([[6.6, 9.4], [24.4, 9.4], [22.4, 24], [8.6, 24]], [0, 0, 2.2, 2.2]))}
      ${front(u, rr(4.2, 7.4, 22.6, 3.8, 1.9))}
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 11, 3))} 15.5 1)` }); }
});
