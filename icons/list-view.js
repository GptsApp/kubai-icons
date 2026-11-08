import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { TILE, back, MARK, stagger } from './_interface.js';

const ROWS = [[7.4, 8], [12.5, 5.6], [17.6, 7]];

export default defineIcon({
  name: 'list-view',
  zh: '列表视图',
  category: 'layout',
  tags: ['list', 'rows', 'items', 'bullets', 'view', '列表'],
  // A bulleted list; on hover the rows slide along one after another, as if scrolled.
  svg: (u) => `${back(u, TILE)}${ROWS.map(([y, w], i) => `<g data-n="r${i}"><path d="${rr(8.2, y - 1.6, 3.2, 3.2, 0.8)}" fill="#fff" data-w="fill"/><path d="M14.4 ${y}H${f(14.4 + w)}" ${MARK}/></g>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    ROWS.forEach((_, i) => at(E['r' + i], { transform: `translate(${f(2 * Math.sin(Math.PI * stagger(p.o, i, 3, 0.7)))} 0)` }));
  }
});
