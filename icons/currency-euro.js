import { defineIcon } from '../packages/core/src/kit.js';
import { coin, coinSpin, glyph } from './_commerce-charts.js';

export default defineIcon({
  name: 'currency-euro',
  zh: '欧元',
  category: 'commerce',
  tags: ['euro', 'eur', 'money', 'price', 'currency', '货币'],
  variants: ['plus', 'minus', 'check', 'x', 'sync'],
  // A coin struck with a euro sign; on hover it spins once on its edge.
  svg: (u) => coin(u, glyph('M20.2 8.5A5.4 5.4 0 1 0 20.2 16.5M10.2 11H15.6M10.2 14.2H15.6')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw: coinSpin
});
