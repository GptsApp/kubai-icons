import { defineIcon, CR, f, ACC, rr, lines, at } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

export default defineIcon({
  name: 'file-text',
  zh: '文本文档',
  category: 'files',
  tags: ['document', 'text', 'txt', 'page', 'notes', '文本'],
  variants: [...FILE_BADGES, 'cog', 'bolt'],
  // A page with a title and a white sheet of text; on hover the last line types out, the sheet grows and a new line is typed below.
  svg: (u) => typedPage(u, `<path d="${lines(9.6, 5.4, [6.4])}" class="ln" stroke="#fff" data-w="stroke"/>
    <path data-n="sh" d="${rr(9, 9.4, 13, 10.8, CR)}" fill="#fff"/>
    <path d="${lines(11.4, 12.6, [8.2])}" ${ACC}/><path data-n="l2" ${ACC}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), a = Math.min(1, o / 0.4), b = Math.max(0, (o - 0.45) / 0.55);
    const g = Math.min(1, Math.max(0, (o - 0.3) / 0.3));
    at(E.sh, { d: rr(9, 9.4, 13, 10.8 + 1.4 * g, CR) });
    at(E.l2, { d: `M11.4 15.6H${f(11.4 + 4.6 + 3.6 * a)}` + (b > 0 ? `M11.4 18.6H${f(11.4 + 6.4 * b)}` : '') });
  }
});
