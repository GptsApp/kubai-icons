import { defineIcon, poly, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const XS = [9, 13.2, 17.6, 22];

export default defineIcon({
  name: 'chart-line',
  zh: '折线图',
  category: 'charts',
  tags: ['chart', 'graph', 'line chart', 'trend', 'statistics', 'analytics', '趋势'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A line chart on a card; on hover the line redraws to new, rising values.
  svg: (u) => `${card(u)}<path data-n="ln" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" data-w="stroke"/>`,
  target: (h) => ({ ys: h ? [17.2, 12.2, 13, 6.4] : [16.6, 11.4, 14.8, 8.6] }),
  draw(p, E) { at(E.ln, { d: poly(XS.map((x, i) => [x, p.ys[i]])) }); }
});
