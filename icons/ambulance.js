import { defineIcon, KR, f, OL, WHITE, rp, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { wheel } from './_travel-transport.js';

const W = 1.4, L = 3.2, X = 11.5, Y = 10.8;
const CROSS = rp([[X - W, Y - L], [X + W, Y - L], [X + W, Y - W], [X + L, Y - W], [X + L, Y + W], [X + W, Y + W], [X + W, Y + L], [X - W, Y + L], [X - W, Y + W], [X - L, Y + W], [X - L, Y - W], [X - W, Y - W]], [0.8, 0.8, 0.4, 0.8, 0.8, 0.4, 0.8, 0.8, 0.4, 0.8, 0.8, 0.4]);

export default defineIcon({
  name: 'ambulance',
  zh: '救护车',
  category: 'health',
  tags: ['ambulance', 'emergency', 'paramedic', 'hospital', 'rescue', '急救', '120'],
  // An ambulance with a cross on its side and a beacon on the roof; on hover it rolls
  // forward, rocks on its springs and settles.
  svg: (u) => {
    const box = rr(3.6, 4.6, 15.8, 13, KR);
    const cab = rp([[17.4, 7.6], [22.4, 7.6], [27.4, 12.6], [27.4, 17.6], [17.4, 17.6]], [1.6, 1.8, 1.8, KR, 0]);
    const win = rp([[19.6, 9.8], [22, 9.8], [24.6, 12.6], [19.6, 12.6]], [0.8, 0.8, 0.4, 0.6]);
    const lamp = rr(9.3, 1.6, 4.4, 4, 1.4);
    return `<g data-n="t">
      <g filter="${u.hi}"><path d="${lamp}" fill="${u.upS}"/></g><path d="${lamp}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.lo(13)}"/></g></g><path d="${box}" ${OL}/>
      <path d="${CROSS}" ${WHITE}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cab}" fill="${u.upS}"/></g></g><path d="${cab}" ${OL}/>
      <path d="${win}" fill="#fff"/>
      ${wheel(u, 8.6, 17.6, 2.8)}${wheel(u, 22.4, 17.6, 2.8)}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const x = -0.5 + 1.2 * o + rattle(o, 0.8, 1);
    const tilt = rattle(o, -1.6, 2);
    at(E.t, { transform: `translate(${f(x)} 0) rotate(${f(tilt)} 8.6 20.4)` });
  }
});
