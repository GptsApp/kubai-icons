import { defineIcon, rp, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const TIERS = [[6, 9.8], [11.2, 15], [16.4, 19.8]], TOP = 6, BOT = 19.8, W0 = 7.6;

export default defineIcon({
  name: 'chart-funnel',
  zh: '漏斗图',
  category: 'charts',
  tags: ['funnel', 'conversion', 'pipeline', 'sales', 'stages', 'chart', '转化'],
  variants: ['plus', 'x', 'search', 'sparkle'],
  // A funnel chart narrowing through three stages; on hover the lower stages widen as more
  // gets through.
  svg: (u) => `${card(u)}${TIERS.map((_, i) => `<path data-n="t${i}" fill="#fff"/>`).join('')}`,
  target: (h) => ({ w: h ? 5.1 : 2 }),
  draw(p, E) {
    const half = (y) => W0 + (p.w - W0) * (y - TOP) / (BOT - TOP);
    TIERS.forEach(([a, b], i) => {
      const ha = half(a), hb = half(b);
      at(E['t' + i], { d: rp([[15.5 - ha, a], [15.5 + ha, a], [15.5 + hb, b], [15.5 - hb, b]], 1) });
    });
  }
});
