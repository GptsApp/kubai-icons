import { defineIcon } from '../packages/core/src/kit.js';
import { coin, coinSpin, glyph } from './_commerce-charts.js';

export default defineIcon({
  name: 'currency-dollar',
  zh: '美元',
  category: 'commerce',
  tags: ['dollar', 'usd', 'money', 'price', 'currency', '货币'],
  variants: ['plus', 'minus', 'check', 'x', 'sync'],
  // A coin struck with a dollar sign; on hover it spins once on its edge.
  svg: (u) => coin(u, glyph('M19.2 9.4C18.7 8.2 17.4 7.5 15.5 7.5C13.2 7.5 11.8 8.6 11.8 10.2C11.8 14 19.2 11.2 19.2 14.9C19.2 16.5 17.7 17.5 15.5 17.5C13.4 17.5 12.1 16.8 11.6 15.6M15.5 5.6V7.5M15.5 17.5V19.4')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw: coinSpin
});
