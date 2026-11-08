import { defineIcon, R, rp, at } from '../packages/core/src/kit.js';
import { card } from './_commerce-charts.js';

const XS = [8.4, 13.7, 19];

export default defineIcon({
  name: 'chart-candlestick',
  zh: 'K 线图',
  category: 'charts',
  tags: ['chart', 'candlestick', 'stock', 'trading', 'market', 'finance', '股票', '行情'],
  variants: ['plus', 'x', 'search', 'up', 'down'],
  // Three candlesticks; on hover each moves to a new price range.
  svg: (u) => `${card(u)}${XS.map((_, i) => `<path data-n="k${i}" ${i === 1 ? 'data-t="fill:#2F6FE0"' : 'fill="#fff"'}/>`).join('')}`,
  // Per candle: wick top, body top, body bottom, wick bottom.
  target: (h) => ({
    k: h ? [10.4, 12.4, 17.4, 19.4, 8.6, 10.6, 14.8, 17.2, 5, 7, 12.6, 15.4]
      : [7.6, 9.8, 15.2, 18, 9.8, 12, 17.6, 19.6, 6.2, 8.4, 13.4, 16.2]
  }),
  draw(p, E) {
    XS.forEach((x, i) => {
      const [wt, bt, bb, wb] = p.k.slice(i * 4, i * 4 + 4);
      at(E['k' + i], { d: rp(R(x + 1, wt, 1.6, wb - wt), 0.8) + rp(R(x, bt, 3.6, bb - bt), 0.6) });
    });
  }
});
