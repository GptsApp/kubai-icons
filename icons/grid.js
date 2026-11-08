import { defineIcon, CR, f, rr, at, scaleAt } from '../packages/core/src/kit.js';
import { TILE, back } from './_interface.js';

const C = 4.13, G = 1.7, X0 = 7.6, Y0 = 4.6;
const CELLS = Array.from({ length: 9 }, (_, i) => [X0 + (i % 3) * (C + G), Y0 + Math.floor(i / 3) * (C + G), (i % 3) + Math.floor(i / 3)]);

export default defineIcon({
  name: 'grid',
  zh: '网格',
  category: 'layout',
  tags: ['grid', 'layout-grid', 'tiles', 'apps', 'thumbnails', '九宫格'],
  // A three-by-three grid; on hover a ripple runs across the cells from the top left.
  svg: (u) => `${back(u, TILE)}${CELLS.map((_, i) => `<path data-n="c${i}" fill="#fff"/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    CELLS.forEach(([x, y, k], i) => {
      const t = Math.max(0, Math.min(1, (o - k * 0.1) / 0.6));
      at(E['c' + i], { d: rr(x, y, C, C, CR), transform: scaleAt(1 - 0.3 * Math.sin(Math.PI * t), x + C / 2, y + C / 2) });
    });
  }
});
