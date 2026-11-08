import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const S = 4.4, G = 1, X0 = 15.5 - (S * 3 + G * 2) / 2, Y0 = 12.5 - (S * 3 + G * 2) / 2;

export default defineIcon({
  name: 'heatmap',
  zh: '热力图',
  category: 'charts',
  tags: ['heatmap', 'heat map', 'density', 'grid', 'intensity', 'chart', '热度'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A grid of cells shaded by intensity; on hover the hot spots move across the grid.
  svg: (u) => `${card(u)}${Array.from({ length: 9 }, (_, i) => `<path data-n="q${i}" d="${rr(X0 + (i % 3) * (S + G), Y0 + Math.floor(i / 3) * (S + G), S, S, 1)}" fill="#fff"/>`).join('')}`,
  target: (h) => ({ o: h ? [0.4, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 0.4] : [1, 0.7, 0.4, 0.7, 1, 0.4, 0.4, 0.4, 1] }),
  draw(p, E) { p.o.forEach((o, i) => at(E['q' + i], { opacity: f(o) })); }
});
