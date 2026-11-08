import { defineIcon, star } from '../packages/core/src/kit.js';
import { coin, coinSpin } from './_commerce-charts.js';

export default defineIcon({
  name: 'coin',
  zh: '硬币',
  category: 'commerce',
  tags: ['money', 'token', 'points', 'reward', '金币'],
  variants: ['plus', 'minus', 'check', 'star'],
  // A coin with a star struck on its face; on hover it spins once on its edge.
  svg: (u) => coin(u, `<path d="${star(5.2, 2.4)}" transform="translate(15.5 13)" data-t="fill:#2F6FE0"/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw: coinSpin
});
