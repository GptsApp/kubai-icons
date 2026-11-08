import { defineIcon, WHITE, at } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';

export default defineIcon({
  name: 'align-center',
  zh: '居中对齐',
  category: 'text',
  tags: ['align', 'center', 'centre', 'paragraph', 'text', 'format', '居中'],
  // Centred lines of text; on hover they reflow to new lengths about the middle.
  svg: (u) => card(u, ROWS.map((_, i) => `<path data-n="r${i}" ${WHITE}/>`).join('')),
  target: (h) => ({ w: h ? [9, 13.8, 6.4] : [13.8, 7.8, 11] }),
  draw(p, E) { ROWS.forEach((y, i) => at(E['r' + i], { d: bar(15.5 - p.w[i] / 2, y, p.w[i]) })); }
});
