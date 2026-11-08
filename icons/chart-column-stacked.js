import { defineIcon, R, rp, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const XS = [8.4, 13.7, 19];

export default defineIcon({
  name: 'chart-column-stacked',
  zh: '堆叠柱状图',
  category: 'charts',
  tags: ['chart', 'graph', 'stacked bar', 'columns', 'statistics', 'analytics', '柱状图'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A stacked column chart; on hover both parts of each column change to new values.
  svg: (u) => `${card(u)}${XS.map((_, i) => `<path data-n="lo${i}" fill="#fff"/><path data-n="up${i}" data-t="fill:#2F6FE0"/>`).join('')}`,
  target: (h) => ({ lo: h ? [6.6, 4, 5.4] : [4, 6.4, 3.6], up: h ? [3, 6.6, 7.6] : [4.6, 3.2, 6.6] }),
  draw(p, E) {
    XS.forEach((x, i) => {
      const a = p.lo[i], b = p.up[i];
      at(E['lo' + i], { d: rp(R(x, 20 - a, 3.6, a), [0, 0, 0.4, 0.4]) });
      at(E['up' + i], { d: rp(R(x, 20 - a - b, 3.6, b), [1, 1, 0, 0]) });
    });
  }
});
