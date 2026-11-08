import { defineIcon, CR, f, rr, at } from '../packages/core/src/kit.js';
import { WIN, back } from './_interface.js';

const LW = 5.27, LANE = (i) => 6 + i * (LW + 1.6), SLOT = (j) => 5.3 + j * 8.2;

export default defineIcon({
  name: 'kanban',
  zh: '看板',
  category: 'layout',
  tags: ['kanban', 'board', 'tasks', 'columns', 'project', 'cards', '任务板'],
  variants: ['plus', 'check'],
  // A task board; on hover a card is dragged from the first lane into the second.
  svg: (u) => `${back(u, WIN)}
    ${[[0, 0], [1, 0], [2, 0], [2, 1]].map(([i, j]) => `<path d="${rr(LANE(i), SLOT(j), LW, 6.2, CR)}" fill="#fff"/>`).join('')}
    <g data-n="mv"><path d="${rr(0, 0, LW, 6.2, CR)}" fill="#fff"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const x = LANE(0) + (LANE(1) - LANE(0)) * o, y = SLOT(1) - 1.2 * Math.sin(Math.PI * o);
    at(E.mv, { transform: `translate(${f(x)} ${f(y)}) rotate(${f(8 * Math.sin(Math.PI * o))} ${f(LW / 2)} 3.1)` });
  }
});
