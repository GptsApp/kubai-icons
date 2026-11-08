import { defineIcon, WHITE, at, clamp01 } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';
import { stagger } from './_interface.js';

export default defineIcon({
  name: 'align-justify',
  zh: '两端对齐',
  category: 'text',
  tags: ['align', 'justify', 'justified', 'paragraph', 'text', 'format', '对齐'],
  // Lines of text set full width; on hover each one gathers in and spreads out to both edges again.
  svg: (u) => card(u, ROWS.map((_, i) => `<path data-n="r${i}" ${WHITE}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    ROWS.forEach((y, i) => {
      const w = 13.8 - 8.6 * Math.sin(Math.PI * stagger(o, i, 3, 0.7));
      at(E['r' + i], { d: bar(15.5 - w / 2, y, w) });
    });
  }
});
