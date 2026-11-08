import { defineIcon, CR, f, DEEP, rr, at } from '../packages/core/src/kit.js';
import { card, bar } from './_files-text.js';

export default defineIcon({
  name: 'text-select',
  zh: '选择文本',
  category: 'text',
  tags: ['select', 'selection', 'highlight', 'text', 'select all', '选中'],
  // Lines of text with a word in the middle line selected; on hover the selection drags out to the line's end and on down into the next line.
  svg: (u) => card(u, `<path d="${bar(8.6, 6.6, 13.8)}${bar(8.6, 18.4, 9.4)}" fill="#fff" data-w="fill"/>
    <path data-n="sel" fill="#fff"/><path data-n="w" ${DEEP}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), a = Math.min(1, o / 0.45), b = Math.max(0, (o - 0.45) / 0.55);
    const w = 11.2 + 5 * a, w3 = 2.4 + 9.6 * b;
    at(E.sel, { d: rr(7.4, 9.9, w, 5.2, CR) + (b ? rr(7.4, 11.5, w3, 9.5, CR) : '') });
    at(E.w, { d: bar(9.6, 12.5, w - 4.4) + (w3 > 5.4 ? bar(9.6, 18.4, w3 - 3.4) : '') });
  }
});
