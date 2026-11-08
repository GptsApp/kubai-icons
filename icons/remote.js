import { defineIcon, f, DEEP, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';
import { solid, arcPath, span } from './_devices.js';

export default defineIcon({
  name: 'remote',
  zh: '遥控器',
  category: 'devices',
  tags: ['remote control', 'controller', 'tv', 'infrared', '遥控'],
  variants: ['plus', 'check', 'cog'],
  // A remote control; on hover its centre button is pressed and its signal waves light up.
  svg: (u) => `${solid(u, rr(9.2, 8.2, 12.6, 15.8, 3.8), u.loS)}
      <path d="${circ(15.5, 13.8, 3.4) + rr(11.9, 19, 3, 3, 0.8) + rr(16.1, 19, 3, 3, 0.8)}" fill="#fff"/>
      <circle data-n="btn" cx="15.5" cy="13.8" ${DEEP}/>
      <path data-n="w1" d="${arcPath(15.5, 8, 4, -36, 36)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" d="${arcPath(15.5, 8, 7.2, -36, 36)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.btn, { r: f(1.4 - 0.25 * span(p.o, 0, 0.3)) });
    at(E.w1, { opacity: f(0.3 + 0.7 * span(p.o, 0.1, 0.5)) });
    at(E.w2, { opacity: f(0.3 + 0.7 * span(p.o, 0.4, 0.85)) });
  }
});
