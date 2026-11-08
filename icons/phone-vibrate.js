import { defineIcon, CR, f, DEEPS, rr, at, rattle, clamp01, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

export default defineIcon({
  name: 'phone-vibrate',
  zh: '振动',
  category: 'devices',
  tags: ['vibrate', 'vibration', 'silent mode', 'buzz', 'phone', '震动', '静音'],
  off: true,
  // A phone on vibrate; on hover it buzzes from side to side and settles.
  svg: (u) => `<g data-n="ph">${back(u, rr(10, 1.6, 11, 21.8, 2.8))}<path d="${rr(12, 3.6, 7, 17.8, CR)}" fill="#fff"/></g>
      <path data-n="v" d="M6.8 8.6V16.4M3.4 10.4V14.6M24.2 8.6V16.4M27.6 10.4V14.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.ph, { transform: `rotate(${f(rattle(o, 7, 4))} 15.5 12.5)` });
    at(E.v, { opacity: f(1 - 0.6 * wave(o, (t) => (1 - t) * Math.abs(Math.sin(4 * Math.PI * t)))) });
  }
});
