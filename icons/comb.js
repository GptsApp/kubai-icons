import { defineIcon, f, at, rr, rattle, clamp01 } from '../packages/core/src/kit.js';
import { front } from './_b1-home.js';

const TEETH = Array.from({ length: 7 }, (_, i) => `M${f(5.1 + 20.8 / 6 * i)} 8V21.6`).join('');

export default defineIcon({
  name: 'comb',
  zh: '梳子',
  category: 'home',
  tags: ['hair', 'grooming', 'barber', 'salon', 'brush', 'style', '头发', '理发', '发梳'],
  // A straight-backed comb with even teeth; on hover it slides along its length as if drawn through hair.
  svg: (u) => `<g data-n="g"><path d="${TEETH}" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#5393FF"/>
      ${front(u, rr(4, 3.3, 23, 6.2, 2.2))}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(${f(rattle(clamp01(p.o), 5, 3))} 0)` }); }
});
