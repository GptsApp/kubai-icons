import { defineIcon, rr, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const X0 = 8, Y0 = 5, X1 = 23, Y1 = 20, G = 1.2;

export default defineIcon({
  name: 'treemap',
  zh: '矩形树图',
  category: 'charts',
  tags: ['treemap', 'tree map', 'proportion', 'breakdown', 'hierarchy', 'chart', '占比'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // Nested blocks sized by share; on hover the shares shift and the blocks resize.
  svg: (u) => `${card(u)}<path data-n="r0" fill="#fff"/><path data-n="r1" fill="#fff"/><path data-n="r2" fill="#fff"/><path data-n="r3" fill="#fff"/>`,
  target: (h) => ({ a: h ? 13 : 14.2, b: h ? 13.8 : 11.4, d: h ? 18.2 : 18.6 }),
  draw(p, E) {
    const { a, b, d } = p, r = (x0, y0, x1, y1) => rr(x0, y0, x1 - x0, y1 - y0, 1);
    at(E.r0, { d: r(X0, Y0, a - G / 2, Y1) });
    at(E.r1, { d: r(a + G / 2, Y0, X1, b - G / 2) });
    at(E.r2, { d: r(a + G / 2, b + G / 2, d - G / 2, Y1) });
    at(E.r3, { d: r(d + G / 2, b + G / 2, X1, Y1) });
  }
});
