import { defineIcon, R, rp, at } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

export default defineIcon({
  name: 'file-chart',
  zh: '报表文件',
  category: 'files',
  tags: ['report', 'chart', 'analytics', 'statistics', 'graph', '报表'],
  variants: FILE_BADGES,
  // A page carrying a bar chart whose bars move to new values on hover.
  svg: (u) => typedPage(u, '<path data-n="b1" fill="#fff" data-w="fill"/><path data-n="b2" fill="#fff" data-w="fill"/><path data-n="b3" fill="#fff" data-w="fill"/>'),
  target: (h) => ({ hgt: h ? [8, 4.6, 9.6] : [4.6, 9.2, 6.6] }),
  draw(p, E) {
    [9.4, 13.8, 18.2].forEach((x, i) => {
      const hh = p.hgt[i];
      at(E['b' + (i + 1)], { d: rp(R(x, 20.4 - hh, 3.4, hh), [1, 1, 0.4, 0.4]) });
    });
  }
});
