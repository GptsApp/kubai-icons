import { defineIcon, KR, f, WHITE, WHITES, rr, at } from '../packages/core/src/kit.js';
import { solid, arcPath, span } from './_devices.js';

export default defineIcon({
  name: 'nfc',
  zh: 'NFC 感应',
  category: 'devices',
  tags: ['contactless', 'tap', 'near field', 'tag', 'pay', '近场通信', '碰一碰'],
  variants: ['check', 'x', 'alert', 'lock'],
  // A contactless tag with waves; on hover the waves ripple outward from the inside out and
  // light up.
  svg: (u) => `${solid(u, rr(5.2, 2.2, 20.6, 20.6, KR), u.loS)}
      <circle data-n="dot" cx="11.6" cy="12.5" r="1.7" ${WHITE}/>
      <path data-n="w1" d="${arcPath(11.6, 12.5, 4.4, 45, 135)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/>
      <path data-n="w2" d="${arcPath(11.6, 12.5, 8.4, 45, 135)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const q = (a, b) => Math.sin(Math.PI * span(p.o, a, b));
    at(E.dot, { r: f(1.7 + 0.6 * q(0, 0.4)) });
    at(E.w1, { d: arcPath(11.6, 12.5, 4.4 + 2 * q(0, 0.6), 45, 135), opacity: f(0.55 + 0.45 * span(p.o, 0, 0.5)) });
    at(E.w2, { d: arcPath(11.6, 12.5, 8.4 + 2.2 * q(0.2, 0.8), 45, 135), opacity: f(0.55 + 0.45 * span(p.o, 0.35, 0.85)) });
  }
});
