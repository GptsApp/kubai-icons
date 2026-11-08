import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { TILE, back, MARK } from './_interface.js';

// Four corner brackets a from the centre, each with arms of length l pointing back in.
const corners = (a, l) => [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => {
  const x = 15.5 + sx * a, y = 12.5 + sy * a;
  return `M${f(x - sx * l)} ${f(y)}H${f(x)}V${f(y - sy * l)}`;
}).join('');

export default defineIcon({
  name: 'maximize',
  zh: '全屏',
  category: 'interface',
  tags: ['expand', 'fullscreen', 'enlarge', 'full screen', '最大化'],
  // Four corners on a screen; on hover they push out toward the edges.
  svg: (u) => `${back(u, TILE)}<path data-n="m" ${MARK}/>`,
  target: (h) => ({ a: h ? 6.6 : 5.2 }),
  draw(p, E) { at(E.m, { d: corners(p.a, 3.6) }); }
});
