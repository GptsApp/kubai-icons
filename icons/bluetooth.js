import { defineIcon, f, DEEP, WHITES, rr, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

export default defineIcon({
  name: 'bluetooth',
  zh: '蓝牙',
  category: 'devices',
  tags: ['wireless', 'pair', 'connect', 'bt', '配对'],
  variants: ['check', 'x', 'search', 'sync', 'alert'],
  off: true,
  badgeAt: [22.8, 19.2],
  // The Bluetooth rune on a rounded tag; on hover dots pop up on both sides as it pairs.
  svg: (u) => `${solid(u, rr(8.6, 1.4, 13.8, 22.2, 6.9), u.loS)}
      <path d="M11.6 8.6L19.4 16.2L15.5 20V5L19.4 8.8L11.6 16.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>
      <circle data-n="d1" cx="4.6" cy="11" r="1.5" ${DEEP}/><circle data-n="d2" cx="26.4" cy="11" r="1.5" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const pop = (a) => f(1.5 + 0.7 * Math.sin(Math.PI * span(p.o, a, a + 0.55)));
    at(E.d1, { r: pop(0), opacity: f(span(p.o, 0, 0.3)) });
    at(E.d2, { r: pop(0.25), opacity: f(span(p.o, 0.25, 0.55)) });
  }
});
