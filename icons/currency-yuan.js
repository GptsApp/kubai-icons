import { defineIcon } from '../packages/core/src/kit.js';
import { coin, coinSpin, glyph } from './_commerce-charts.js';

export default defineIcon({
  name: 'currency-yuan',
  zh: '人民币',
  category: 'commerce',
  tags: ['yuan', 'rmb', 'cny', 'yen', 'jpy', 'money', 'currency', '元', '日元'],
  variants: ['plus', 'minus', 'check', 'x', 'sync'],
  // A coin struck with a yuan sign; on hover it spins once on its edge.
  svg: (u) => coin(u, glyph('M11.6 6.4L15.5 11.4L19.4 6.4M15.5 11.4V19M12.2 13H18.8M12.2 16.4H18.8')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw: coinSpin
});
