import { defineIcon, KR, f, DEEP, DEEPS, SOFTS, rr, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const C = [13.2, 12.5], PIVOT = [23.6, 6.4];

export default defineIcon({
  name: 'turntable',
  zh: '唱片机',
  category: 'media',
  tags: ['record player', 'vinyl', 'phonograph', 'dj', 'deck', 'music', '留声机', '黑胶机'],
  // A record deck seen from above, with a platter and a parked tonearm; on hover the arm swings
  // onto the record and the platter spins.
  svg: (u) => `${back(u, rr(4, 3.3, 23, 18.4, KR))}
      <path d="${circ(C[0], C[1], 7.2)}" fill="#fff"/>
      <g data-n="spin"><path d="M3.6 -3.6A5.1 5.1 0 0 1 3.6 3.6M-3.6 3.6A5.1 5.1 0 0 1 -3.6 -3.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${SOFTS}/></g>
      <circle cx="${C[0]}" cy="${C[1]}" r="2.4" ${DEEP}/>
      <g data-n="arm"><path d="M0 0V10.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path d="${rr(-1.6, 9, 3.2, 4, 1)}" ${DEEP}/></g>
      <circle cx="${PIVOT[0]}" cy="${PIVOT[1]}" r="1.9" ${DEEP}/>`,
  target: (h) => ({ arm: h ? 34 : 0, rot: h ? 200 : 0 }),
  draw(p, E) {
    at(E.arm, { transform: `translate(${PIVOT[0]} ${PIVOT[1]}) rotate(${f(p.arm)})` });
    at(E.spin, { transform: `translate(${C[0]} ${C[1]}) rotate(${f(p.rot)})` });
  }
});
