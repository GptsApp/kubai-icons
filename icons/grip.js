import { defineIcon, f, WHITE, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { TILE, back, stagger } from './_interface.js';

const DOTS = [0, 1, 2].flatMap((r) => [[12.4, 7.4 + r * 5.1], [18.6, 7.4 + r * 5.1]]);

export default defineIcon({
  name: 'grip',
  zh: '拖动手柄',
  category: 'layout',
  tags: ['grip', 'drag handle', 'grip vertical', 'reorder', 'move', 'handle', '拖拽'],
  // A drag handle with two columns of dots; on hover the dots press in one row after another, as the handle is grabbed.
  svg: (u) => `${back(u, TILE)}${DOTS.map((_, i) => `<path data-n="d${i}" ${WHITE}/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    DOTS.forEach(([x, y], i) => {
      const r = 1.8 * (1 - 0.5 * Math.sin(Math.PI * stagger(o, i >> 1, 3, 0.7)));
      at(E['d' + i], { d: circ(x, y, r) });
    });
  }
});
