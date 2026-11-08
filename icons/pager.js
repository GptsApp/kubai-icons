import { defineIcon, KR, CR, f, DEEP, WHITE, R, rp, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { span } from './_devices.js';

const DIGITS = [8.8, 12.4, 16, 19.6];

export default defineIcon({
  name: 'pager',
  zh: '寻呼机',
  category: 'devices',
  tags: ['beeper', 'bleeper', 'on call', 'alert', 'message', 'BP 机', '传呼机'],
  variants: ['check', 'x', 'alert'],
  off: true,
  // A pager with a belt clip, a number on its display and two buttons; on hover it buzzes and
  // one more digit arrives on the display.
  svg: (u) => `<g data-n="g">${front(u, rp(R(18, 1.8, 6.4, 5), [1.6, 1.6, 0, 0]), u.upS)}
      ${back(u, rr(4, 4.8, 23, 17, KR))}
      <path d="${rr(6.4, 7, 18.2, 7.6, CR)}" fill="#fff"/>
      ${DIGITS.map((x, i) => `<path data-n="d${i}" ${DEEP}/>`).join('')}
      <path d="${rr(8, 16.8, 6.2, 2.4, 1.2) + rr(16.8, 16.8, 6.2, 2.4, 1.2)}" ${WHITE}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(${f(rattle(o, 1.8, 3))} 0)` });
    DIGITS.forEach((x, i) => {
      const k = i < 3 ? 1 : span(o, 0.4, 1), h = 4 * k;
      at(E['d' + i], { d: rr(x, 8.8 + (4 - h) / 2, 2.4, h, 0.6 * k), opacity: k > 0.02 ? 1 : 0 });
    });
  }
});
