import { defineIcon, f, OL, DEEPS, WHITE, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const P = [15.5, 15.6];
const BASE = 'M9.6 23.6Q7.2 23.6 7.2 21.2C7.2 17.2 10.9 14.8 15.5 14.8C20.1 14.8 23.8 17.2 23.8 21.2Q23.8 23.6 21.4 23.6Z';
const tip = (a, l, s) => [P[0] + s * l * Math.sin(a * Math.PI / 180), P[1] - l * Math.cos(a * Math.PI / 180)];

export default defineIcon({
  name: 'antenna',
  zh: '天线',
  category: 'devices',
  tags: ['tv antenna', 'rabbit ears', 'aerial', 'signal', 'reception', '信号'],
  off: true,
  // An indoor antenna with two rods; on hover the rods spread and reach out for a signal.
  svg: (u) => `<path data-n="rods" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path data-n="ta" fill="${u.upS}"/></g><path data-n="taO" ${OL}/>
      <g filter="${u.hi}"><path data-n="tb" fill="${u.upS}"/></g><path data-n="tbO" ${OL}/>
      ${back(u, BASE)}
      <path d="${circ(15.5, 19.8, 1.4)}" ${WHITE}/>`,
  target: (h) => ({ a: h ? 42 : 30, l: h ? 13.2 : 12.4 }),
  draw(p, E) {
    const A = tip(p.a, p.l, -1), B = tip(p.a, p.l, 1);
    at(E.rods, { d: `M${f(A[0])} ${f(A[1])}L${P[0]} ${P[1]}L${f(B[0])} ${f(B[1])}` });
    const a = circ(A[0], A[1], 1.6), b = circ(B[0], B[1], 1.6);
    at(E.ta, { d: a }); at(E.taO, { d: a }); at(E.tb, { d: b }); at(E.tbO, { d: b });
  }
});
