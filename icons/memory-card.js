import { defineIcon, KR, f, DEEP, WHITE, R, rp, rr, at, clamp01, bump } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const BODY = rp([[6.8, 1], [24.2, 1], [24.2, 8.6], [21.4, 11.4], [21.4, 24], [6.8, 24]], [KR, 1.6, 1, 1, KR, KR]);
const LABEL = rp(R(6.8, 13, 14.6, 11), [1.8, 1.8, KR, KR]);
const PINS = [8.9, 12.5, 16.1, 19.7].map((x) => rr(x, 3.2, 2.4, 5.2, 0.6)).join('');

export default defineIcon({
  name: 'memory-card',
  zh: '微型存储卡',
  category: 'devices',
  tags: ['microsd', 'tf card', 'flash card', 'storage', 'phone storage', '内存卡', 'TF 卡'],
  variants: ['plus', 'check', 'x', 'alert', 'lock'],
  // A small flash card with a stepped side, gold contacts and an insert arrow; on hover it is
  // pushed into a spring slot and pops back.
  svg: (u) => `<g data-n="g">${back(u, BODY)}
      <path d="${PINS}" ${WHITE}/>
      ${front(u, LABEL)}
      <path d="${rp([[10.2, 16.6], [18, 16.6], [14.1, 21.4]], [0.6, 0.6, 0.8])}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(0 ${f(2.6 * bump(clamp01(p.o)))})` }); }
});
