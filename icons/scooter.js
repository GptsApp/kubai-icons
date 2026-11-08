import { defineIcon, f, OL, DEEPS, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { wheel } from './_travel-transport.js';

export default defineIcon({
  name: 'scooter',
  zh: '滑板车',
  category: 'transport',
  tags: ['kick scooter', 'e-scooter', 'ride', 'micromobility', '电动滑板车'],
  variants: ['check', 'clock'],
  // A kick scooter; on hover it glides forward, overshoots a little and settles.
  svg: (u) => {
    const deck = rr(6, 16.2, 15.4, 3.6, 1.8);
    return `<g data-n="s">
      <path d="M23 20.4L19.8 3.4M16.8 3.4H22.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${deck}" fill="${u.loS}"/></g></g><path d="${deck}" ${OL}/>
      ${wheel(u, 7.6, 20.6, 2.8)}${wheel(u, 23, 20.6, 2.8)}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.s, { transform: `translate(${f(-0.6 + 1.4 * o + rattle(o, 0.9, 1))} 0)` });
  }
});
