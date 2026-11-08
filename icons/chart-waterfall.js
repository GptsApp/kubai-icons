import { defineIcon, rr, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const W = 3, XS = [8.15, 12.05, 15.95, 19.85];

export default defineIcon({
  name: 'chart-waterfall',
  zh: '瀑布图',
  category: 'charts',
  tags: ['waterfall', 'bridge chart', 'change', 'gain', 'loss', 'chart', '增减'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A waterfall chart: a start bar, a gain, a loss and the total; on hover the steps change.
  svg: (u) => `${card(u)}${XS.map((_, i) => `<path data-n="b${i}" fill="#fff"/>`).join('')}`,
  target: (h) => ({ y: h ? [16.2, 5.4, 9.2] : [13.2, 8.4, 11.4] }),
  draw(p, E) {
    const [a, b, c] = p.y, base = 19.8, bars = [[a, base], [b, a], [b, c], [c, base]];
    bars.forEach(([t, d], i) => at(E['b' + i], { d: rr(XS[i], t, W, d - t, 0.8) }));
  }
});
