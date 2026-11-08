import { defineIcon, f, ACC, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { back, front } from './_b6-vehicles.js';

const CANOPY = 'M4 12.4A11.5 10.8 0 0 1 27 12.4Q23.2 10.2 19.3 12.4Q15.5 10.2 11.7 12.4Q7.8 10.2 4 12.4Z';
const GORE = 'M11.7 12.4C11.2 6 13 1.6 15.5 1.6C18 1.6 19.8 6 19.3 12.4Q15.5 10.2 11.7 12.4Z';

export default defineIcon({
  name: 'parachute',
  zh: '降落伞',
  category: 'transport',
  tags: ['skydive', 'airdrop', 'drop', 'paratrooper', 'descent', '跳伞', '空投'],
  // A parachute carrying a crate; on hover it sways under the canopy and drifts downwards.
  svg: (u) => `<g data-n="t">
    <path d="M5.2 12.4L13 18.8M11.7 12.2L14.4 18.4M19.3 12.2L16.6 18.4M25.8 12.4L18 18.8" fill="none" ${ACC}/>
    ${back(u, CANOPY, u.loS)}
    ${front(u, GORE, u.upS)}
    ${back(u, rr(12, 18.2, 7, 5.4, 1.4), u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? 1.4 : -0.3 }),
  draw(p, E) {
    at(E.t, { transform: `translate(0 ${f(p.y)}) rotate(${f(rattle(clamp01(p.o), 9, 3))} 15.5 2)` });
  }
});
