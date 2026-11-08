import { defineIcon, f, OL, rp, rr, at } from '../packages/core/src/kit.js';

// An airliner from above, drawn nose-up round the origin and turned 45° to fly north-east.
const BODY = rr(-2.3, -12.6, 4.6, 24.6, 2.3);
const WINGS = rp([[-1.8, -3.2], [1.8, -3.2], [12, 3.6], [12, 6], [1.8, 2.8], [-1.8, 2.8], [-12, 6], [-12, 3.6]], [0.6, 0.6, 1, 1, 0.6, 0.6, 1, 1])
  + rp([[-1.4, 7.2], [1.4, 7.2], [5.8, 10.2], [5.8, 12], [-5.8, 12], [-5.8, 10.2]], [0.5, 0.5, 0.8, 0.8, 0.8, 0.8]);

export default defineIcon({
  name: 'plane',
  zh: '飞机',
  category: 'transport',
  tags: ['airplane', 'flight', 'travel', 'airport', 'aeroplane', 'airplane mode', '航班', '飞行模式'],
  variants: ['plus', 'check', 'x', 'clock', 'search', 'alert'],
  off: true,
  // An airliner seen from above; on hover it climbs, moving ahead and growing nearer.
  svg: (u) => `<g data-n="p"><g transform="rotate(45)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${WINGS}" fill="${u.loS}"/></g></g><path d="${WINGS}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.upS}"/></g></g><path d="${BODY}" ${OL}/></g></g>`,
  target: (h) => ({ d: h ? 1.2 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) {
    at(E.p, { transform: `translate(${f(17.1 + p.d)} ${f(11.1 - p.d)}) scale(${f(p.s)})` });
  }
});
