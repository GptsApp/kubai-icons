import { defineIcon, WHITE, at, clamp01 } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';
import { stagger } from './_interface.js';

// Line lengths at rest and after the reflow.
const A = [13.8, 8.4, 11.2], B = [7.2, 13.8, 5.4];

export default defineIcon({
  name: 'align-left',
  zh: '左对齐',
  category: 'text',
  tags: ['align', 'left', 'paragraph', 'text', 'format', '对齐'],
  // Lines of text set flush left; on hover they reflow one after another to new lengths along the left edge.
  svg: (u) => card(u, ROWS.map((_, i) => `<path data-n="r${i}" ${WHITE}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    ROWS.forEach((y, i) => {
      const t = stagger(clamp01(p.o), i, 3, 0.6);
      at(E['r' + i], { d: bar(8.6, y, A[i] + (B[i] - A[i]) * t) });
    });
  }
});
