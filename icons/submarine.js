import { defineIcon, f, circ, DEEPS, rp, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { back, setD, puff } from './_b6-vehicles.js';

export default defineIcon({
  name: 'submarine',
  zh: '潜水艇',
  category: 'transport',
  tags: ['sub', 'u-boat', 'underwater', 'navy', 'periscope', 'deep sea', '潜艇'],
  // A submarine with portholes; on hover the periscope rises and bubbles stream upward.
  svg: (u) => `<g data-n="t">${puff(u, 'p')}${puff(u, 'q')}
    <path d="${rp([[2.8, 11.6], [7.4, 14.4], [7.4, 18.6], [2.8, 21.4]], [0.8, 0, 0, 0.8])}" fill="${u.pure('#2F6FE0')}"/>
    <path data-n="sc" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    ${back(u, rr(11.8, 6.4, 8.2, 6, 1.6), u.upS)}
    ${back(u, rr(4.8, 10.6, 22.6, 11.4, 5.7), u.loS)}
    ${[10.2, 16, 21.8].map((x) => `<circle cx="${x}" cy="16.3" r="1.8" fill="#fff"/>`).join('')}</g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? -2.8 : 0, p: h ? [24.2, 6.4, 1.7] : [23.4, 13.4, 0.5], q: h ? [27, 2, 1.3] : [23.4, 13.4, 0.5] }),
  draw(p, E) {
    at(E.sc, { d: `M17.6 7V${f(3.8 + p.y)}H21.2` });
    setD(E, 'p', circ(p.p[0], p.p[1], p.p[2]));
    setD(E, 'q', circ(p.q[0], p.q[1], p.q[2]));
    at(E.t, { transform: `translate(0 ${f(rattle(clamp01(p.o), 1.2, 2))})` });
  }
});
