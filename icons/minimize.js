import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { TILE, back, MARK } from './_interface.js';

// Four corner brackets a from the centre, each with arms of length l pointing outward.
const corners = (a, l) => [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => {
  const x = 15.5 + sx * a, y = 12.5 + sy * a;
  return `M${f(x + sx * l)} ${f(y)}H${f(x)}V${f(y + sy * l)}`;
}).join('');

export default defineIcon({
  name: 'minimize',
  zh: '退出全屏',
  category: 'interface',
  tags: ['shrink', 'exit fullscreen', 'collapse', 'reduce', '还原'],
  // Four corners on a screen pointing inward; on hover they draw in toward the centre.
  svg: (u) => `${back(u, TILE)}<path data-n="m" ${MARK}/>`,
  target: (h) => ({ a: h ? 2.5 : 3.3 }),
  draw(p, E) { at(E.m, { d: corners(p.a, 3.4) }); }
});
