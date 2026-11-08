import { defineIcon, f, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const slab = (y) => rr(16.6, y, 9.6, 4.4, 2.2);

export default defineIcon({
  name: 'hand-coins',
  zh: '付款',
  category: 'commerce',
  tags: ['pay', 'payment', 'donate', 'tip', 'salary', 'money', 'hand', '支付', '捐赠'],
  variants: ['plus', 'check', 'heart'],
  // An open hand holding a short stack of coins; on hover one more coin drops onto it.
  svg: (u) => `<g data-n="drop">${back(u, slab(0), u.upS)}</g>
    ${back(u, slab(10.6), u.upS)}${back(u, slab(7), u.upS)}
    ${back(u, rr(6.2, 14.2, 21, 6.2, 3.1), u.loS)}
    <g transform="translate(9.6 17.2) rotate(-32)">${front(u, rr(0, -1.9, 9.4, 3.8, 1.9), u.upS)}</g>
    ${front(u, rr(3.4, 12.2, 4.6, 9.6, 1.6), u.upS)}`,
  target: (h) => ({ y: h ? 3.4 : -2, o: h ? 1 : 0 }),
  draw(p, E) { at(E.drop, { transform: `translate(0 ${f(p.y)})`, opacity: f(clamp01(p.o * 2)) }); }
});
