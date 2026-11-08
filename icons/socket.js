import { defineIcon, KR, f, DEEP, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'socket',
  zh: '插座',
  category: 'home',
  tags: ['outlet', 'wall socket', 'power', 'electric', 'plug', '电源插座'],
  variants: ['check', 'x', 'bolt'],
  off: true,
  // A wall outlet; on hover its safety shutters slide wide open over the slots.
  svg: (u) => `${back(u, rr(5.2, 2.2, 20.6, 20.6, KR))}
      ${front(u, circ(15.5, 12.5, 7.4))}
      <path data-n="sl" ${DEEP}/>`,
  target: (h) => ({ h: h ? 6.8 : 3.4, w: h ? 3 : 2.4, g: h ? 3.4 : 2.6 }),
  draw(p, E) {
    const y = 11.2 - p.h / 2;
    at(E.sl, { d: rr(13.1 - p.w / 2, y, p.w, p.h, 1.2) + rr(17.9 - p.w / 2, y, p.w, p.h, 1.2) + rr(15.5 - p.w / 2, 15.2, p.w, p.g, 1.2) });
  }
});
