import { defineIcon, KR, f, DEEP, DEEPS, R, rp, rr, arrow, at, circ, wave } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { span } from './_devices.js';

const LEDS = [7.5, 11.5, 15.5, 19.5, 23.5];
const UP = arrow(11.6, 9, 11.6, 1.8, 3.2, 2.7), DOWN = arrow(19.4, 1.8, 19.4, 9, 3.2, 2.7);

export default defineIcon({
  name: 'modem',
  zh: '调制解调器',
  category: 'devices',
  tags: ['dial-up', 'broadband', 'internet', 'network', 'dsl', 'cable modem', '猫', '光猫'],
  variants: ['check', 'x', 'alert'],
  off: true,
  // A low modem with a row of status lights and arrows for data going each way; on hover the
  // arrows push out in turn and the lights run along the row.
  svg: (u) => `<g data-n="up"><path d="${UP.shaft}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path d="${UP.head}" ${DEEP}/></g>
      <g data-n="dn"><path d="${DOWN.shaft}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path d="${DOWN.head}" ${DEEP}/></g>
      ${back(u, rr(4, 11.4, 23, 10.4, KR))}
      ${front(u, rp(R(4, 15, 23, 6.8), [1.8, 1.8, KR, KR]))}
      <path data-n="ld" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = p.o, pulse = (a, b) => wave(o, (t) => Math.sin(Math.PI * span(t, a, b)));
    at(E.up, { transform: `translate(0 ${f(-1.6 * pulse(0, 0.55))})` });
    at(E.dn, { transform: `translate(0 ${f(1.2 * pulse(0.35, 0.95))})` });
    at(E.ld, { d: LEDS.map((x, i) => circ(x, 18.4, 1.3 + 0.7 * pulse(0.08 * i, 0.08 * i + 0.5))).join('') });
  }
});
