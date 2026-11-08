import { defineIcon, f, DEEP, DEEPS, WHITES, rr, circ, lines, at, wave } from '../packages/core/src/kit.js';
import { arcPath, span } from './_devices.js';
import { back, front } from './_w2-devices.js';

const CX = 15.5, CY = 12.6;
const GLASS = 'M11 15.8C8.6 14 7 11.4 7 8.8A8.5 8.5 0 0 1 24 8.8C24 11.4 22.4 14 20 15.8V17.6H11Z';

export default defineIcon({
  name: 'smart-bulb',
  zh: '智能灯泡',
  category: 'home',
  tags: ['smart light', 'connected bulb', 'iot', 'wifi light', 'smart home', 'lighting', '智能照明', '灯'],
  variants: ['check', 'x', 'clock', 'cog'],
  off: true,
  // A bulb with a wireless signal where the filament would be; on hover the bulb brightens and
  // the signal pulses outward from the dot.
  svg: (u) => `${front(u, GLASS)}
      <circle data-n="glow" cx="${CX}" cy="9" fill="#fff"/>
      <path data-n="a1" d="${arcPath(CX, CY, 3.4, -46, 46)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="a2" d="${arcPath(CX, CY, 6.8, -42, 42)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path d="${circ(CX, CY, 1.5)}" ${DEEP}/>
      ${back(u, rr(10.8, 17, 9.4, 6.4, 2), u.loS)}
      <path d="${lines(12.9, 20.2, [5.2])}" class="ln" ${WHITES}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = p.o, pulse = (a, b) => wave(o, (t) => Math.sin(Math.PI * span(t, a, b)));
    at(E.glow, { r: f(6.5 + 1.1 * o) });
    at(E.a1, { opacity: f(1 - 0.75 * pulse(0, 0.5)) });
    at(E.a2, { opacity: f(1 - 0.75 * pulse(0.3, 0.85)) });
  }
});
