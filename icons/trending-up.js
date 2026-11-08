import { defineIcon, clamp01 } from '../packages/core/src/kit.js';
import { card, trendSvg, trendDraw } from './_commerce-charts.js';

const REST = [8.6, 17.4, 12.8, 13, 16.2, 15.8, 22.4, 8.4], END = [8.6, 19, 12.8, 12.2, 16.2, 15.6, 23.2, 4.8];

export default defineIcon({
  name: 'trending-up',
  zh: '上涨',
  category: 'charts',
  tags: ['trend', 'growth', 'increase', 'rise', 'profit', 'stock', '增长'],
  variants: ['plus', 'check', 'sparkle'],
  // A rising zigzag arrow on a chart card; on hover it surges much higher, the tip
  // overshooting before it settles.
  svg: (u) => card(u) + trendSvg(),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = o + 1.6 * o * (1 - o);
    trendDraw({ q: REST.map((v, i) => v + (END[i] - v) * k) }, E);
  }
});
