import { DEEP, defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

// Tiles one unit apart, so neighbouring outlines land on the same line.
const W = 5, H = 4.2, PX = W + 1, PY = H + 1, X0 = 4, Y0 = 1.8, LOW = Y0 + 3 * PY + 2;
const R0 = 0.8;
const tile = (c, r) => rr(X0 + c * PX, Y0 + r * PY, W, H, R0);
const MAIN = [[0, 0], [3, 0], [0, 1], [1, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]].map(([c, r]) => tile(c, r)).join('');
const LOWER = [1, 2, 3].map((c) => rr(X0 + c * PX, LOW, W, H, R0)).join('');

export default defineIcon({
  name: 'periodic-table',
  zh: '元素周期表',
  category: 'science',
  tags: ['elements', 'chemistry', 'mendeleev', 'table', '化学元素', '周期表'],
  // The stepped grid of the periodic table with one element marked; on hover the mark runs along the period.
  svg: (u) => `${solid(u, MAIN, u.loS)}${solid(u, LOWER, u.upS)}
    <path data-n="h" d="${rr(0, 0, W, H, R0)}" ${DEEP}/>`,
  target: (h) => ({ x: h ? 3 : 0 }),
  draw(p, E) { at(E.h, { transform: `translate(${f(X0 + p.x * PX)} ${f(Y0 + 2 * PY)})` }); }
});
