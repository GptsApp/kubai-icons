import { defineIcon, rr, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const ROWS = [6.6, 11, 15.4];

export default defineIcon({
  name: 'chart-gantt',
  zh: '甘特图',
  category: 'charts',
  tags: ['gantt', 'timeline', 'schedule', 'project', 'plan', 'tasks', '进度', '排期'],
  variants: ['plus', 'check', 'clock', 'search'],
  // A Gantt chart of three staggered task bars; on hover the tasks move on through the plan.
  svg: (u) => `${card(u)}${ROWS.map((_, i) => `<path data-n="b${i}" fill="#fff"/>`).join('')}`,
  target: (h) => ({ x: h ? [8.4, 19.4, 13, 22.6, 18.4, 22.6] : [8.4, 14.2, 11, 17.8, 14.4, 22.6] }),
  draw(p, E) {
    ROWS.forEach((y, i) => { const a = p.x[i * 2], b = p.x[i * 2 + 1]; at(E['b' + i], { d: rr(a, y, b - a, 3.2, 1) }); });
  }
});
