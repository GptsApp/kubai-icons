import { defineIcon, KR, DEEP, R, rp, rr, circ, at, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

export default defineIcon({
  name: 'battery-backup',
  zh: '不间断电源',
  category: 'devices',
  tags: ['ups', 'power backup', 'uninterruptible', 'surge', 'outage', 'emergency power', 'UPS 电源', '后备电源'],
  variants: ['check', 'x', 'alert', 'bolt'],
  // A power backup unit with a large battery above its outlet; on hover the battery drains to
  // carry the outlet and then charges back up.
  svg: (u) => `${back(u, rr(5, 1.4, 21, 22.2, KR))}
      <path d="${rr(7.9, 3.8, 12.8, 8.6, 1.6)}" fill="#fff"/>
      <path d="${rp(R(20, 6.2, 3.1, 3.8), [0, 1, 1, 0])}" fill="#fff"/>
      <path data-n="lv" ${DEEP}/>
      <path d="${circ(15.5, 18.1, 3.9)}" fill="#fff"/>
      <path d="${rr(12.5, 16.5, 2.4, 3.2, 0.8) + rr(16.1, 16.5, 2.4, 3.2, 0.8)}" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const k = wave(p.o, (t) => Math.sin(Math.PI * t));
    at(E.lv, { d: rr(9.6, 5.5, 9.4 - 6.4 * k, 5.2, 0.8) });
  }
});
