import { defineIcon, f, rp, at, bump, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const UPPER = 'M5.4 6C5.2 4.4 6.2 3.6 7.6 3.8L8.8 4C9.6 7.2 12 10 15.2 12.8C17 14.4 19 15.2 21.4 15.6L24.2 16.2C26.6 16.8 28 18.2 28 20.2C28 21.6 27 22.4 25.6 22.4H20C17.6 22.4 16.4 21.2 15 19.4L12.4 16C10.8 13.9 9 13.2 6 13.4Z';
const HEEL = rp([[5.6, 11.8], [10, 12.8], [8.6, 24], [6, 24]], [0.4, 0.4, 0.8, 0.8]);

export default defineIcon({
  name: 'high-heel',
  zh: '高跟鞋',
  category: 'commerce',
  tags: ['heels', 'stiletto', 'shoe', 'pump', 'fashion', 'footwear', '女鞋', '鞋子'],
  variants: ['plus', 'check', 'heart'],
  // A stiletto pump side on; on hover the heel lifts off the floor and clicks back down.
  svg: (u) => `<g data-n="g">${back(u, HEEL, u.upS)}${back(u, UPPER, u.loS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(-1.2 -1.4) rotate(${f(bump(clamp01(p.o)) * 11)} 26 22.4)` }); }
});
