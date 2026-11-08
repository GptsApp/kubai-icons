import { defineIcon, clamp01 } from '../packages/core/src/kit.js';
import { card, trendSvg, trendDraw } from './_commerce-charts.js';

const REST = [8.6, 7.6, 12.8, 12, 16.2, 9.2, 22.4, 16.6], END = [8.6, 5.8, 12.8, 12.8, 16.2, 9.4, 23.2, 20.2];

export default defineIcon({
  name: 'trending-down',
  zh: '下跌',
  category: 'charts',
  tags: ['trend', 'decline', 'decrease', 'fall', 'loss', 'stock', '下降'],
  variants: ['plus', 'alert', 'x'],
  // A falling zigzag arrow on a chart card; on hover it plunges much lower, the tip
  // overshooting before it settles.
  svg: (u) => card(u) + trendSvg(),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = o + 1.6 * o * (1 - o);
    trendDraw({ q: REST.map((v, i) => v + (END[i] - v) * k) }, E);
  }
});
