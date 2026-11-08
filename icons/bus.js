import { defineIcon, KR, CR, f, OL, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { wheel } from './_travel-transport.js';

const DOOR = rp(R(22.2, 6, 3, 11.6), [CR, CR, 0.6, 0.6]);

export default defineIcon({
  name: 'bus',
  zh: '公交车',
  category: 'transport',
  tags: ['bus', 'coach', 'public transport', 'transit', 'commute', '巴士', '公交'],
  variants: ['check', 'clock', 'alert'],
  // A bus seen from the side; on hover it pulls up, rocking forward and back on its springs,
  // and its front doors fold open.
  svg: (u) => {
    const body = rr(3.6, 3.4, 23.8, 16.2, KR), skirt = rp(R(3.6, 13.4, 23.8, 6.2), [1.6, 1.6, KR, KR]);
    const win = [6, 11.4, 16.8].map((x) => rr(x, 6, 3.8, 4.8, CR)).join('');
    return `<g transform="translate(0 -0.4)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b0" d="${body}" fill="${u.loS}"/></g></g><path data-n="b1" d="${body}" ${OL}/>
      <path data-n="b2" d="${win}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="b3" d="${skirt}" fill="${u.up(6.2)}"/></g><path data-n="b4" d="${skirt}" ${OL}/>
      <path data-n="b5" d="${DOOR}" fill="${u.pure('#2F6FE0')}"/>
      <clipPath id="${u.id('dr')}"><path d="${DOOR}"/></clipPath>
      <g data-n="b6" clip-path="url(#${u.id('dr')})"><path data-n="l" fill="#fff"/><path data-n="r" fill="#fff"/></g>
      ${wheel(u, 9.4, 19.6, 2.8)}${wheel(u, 19, 19.6, 2.8)}</g>`;
  },
  target: (h) => ({ w: h ? 0.2 : 1.5, o: h ? 1 : 0 }),
  draw(p, E) {
    // The body pitches about the axle line; the wheels stay on the road.
    const a = rattle(clamp01(p.o), 3, 3), t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 14.2 19.6)`;
    for (let i = 0; i < 7; i++) t ? E['b' + i].setAttribute('transform', t) : E['b' + i].removeAttribute('transform');
    at(E.l, { d: rp(R(22.2, 5, p.w, 14), 0) });
    at(E.r, { d: rp(R(25.2 - p.w, 5, p.w, 14), 0) });
  }
});
