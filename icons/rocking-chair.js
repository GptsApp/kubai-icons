import { defineIcon, f, DEEPS, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';

export default defineIcon({
  name: 'rocking-chair',
  zh: '摇椅',
  category: 'home',
  tags: ['chair', 'seat', 'furniture', 'porch', 'relax', 'rocker', '椅子', '家具'],
  // A rocking chair from the side; it rocks to and fro on its runners on hover.
  svg: (u) => {
    const seat = rr(7.8, 12, 16.4, 3.8, 1.6), rest = rp([[4.2, 1.6], [8.4, 0.8], [12, 13.6], [8, 14.8]], 1.6);
    return `<g data-n="g">
      <path d="M4.5 21.2A23 23 0 0 0 26.5 21.2" fill="none" stroke-width="2.6" stroke-linecap="round" ${DEEPS}/>
      <path d="M10.6 15L9.2 22M21.6 15L23 21.6M21.6 13V7.6H7.8" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      ${back(u, rest)}${front(u, seat)}
    </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 3))} 15.5 1)` }); }
});
