import { defineIcon, KR, f, OL, rp, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { wheel } from './_travel-transport.js';

export default defineIcon({
  name: 'truck',
  zh: '货车',
  category: 'transport',
  tags: ['delivery', 'shipping', 'lorry', 'freight', 'logistics', '卡车', '物流'],
  variants: ['plus', 'check', 'x', 'clock', 'search', 'alert'],
  // A delivery truck; on hover it rolls forward, rocks on its springs and settles.
  svg: (u) => {
    const box = rr(3.6, 4, 15.6, 13.6, KR);
    const cab = rp([[17.2, 8], [22.6, 8], [27.4, 12.8], [27.4, 17.6], [17.2, 17.6]], [1.6, 1.8, 1.8, KR, 0]);
    const win = rp([[19.4, 10.2], [22, 10.2], [24.6, 12.8], [19.4, 12.8]], [0.8, 0.8, 0.4, 0.6]);
    return `<g data-n="t">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.lo(13.6)}"/></g></g><path d="${box}" ${OL}/>
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
