import { defineIcon, circ, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

export default defineIcon({
  name: 'chart-scatter',
  zh: '散点图',
  category: 'charts',
  tags: ['chart', 'graph', 'scatter plot', 'dots', 'correlation', 'statistics'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A scatter plot; on hover the dots move into line along a rising trend.
  svg: (u) => `${card(u)}<path data-n="d" fill="#fff" data-w="fill"/>`,
  target: (h) => ({
    pts: h ? [9.2, 17.2, 11.8, 18.6, 14.4, 13, 17.2, 13.6, 19.4, 8.6, 22.2, 9.6]
      : [9.2, 16.2, 12.2, 10.8, 14.6, 17.8, 17.2, 9.4, 20, 14.6, 22, 7]
  }),
  draw(p, E) {
    let d = '';
    for (let i = 0; i < p.pts.length; i += 2) d += circ(p.pts[i], p.pts[i + 1], 1.6);
    at(E.d, { d });
  }
});
