import { defineIcon, CR, f, DEEP, WHITE, rr, at } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

// Zipper teeth down the page, alternating left and right of the seam.
const TEETH = [1.5, 3.1, 4.7, 6.3, 7.9, 9.5, 11.1, 12.7, 14.3].map((y, i) => rr(i % 2 ? 13.6 : 11, y, 2.6, 1.6, 0.4)).join('');

export default defineIcon({
  name: 'file-archive',
  zh: '压缩文件',
  category: 'files',
  tags: ['zip', 'archive', 'compressed', 'rar', 'package', '压缩包'],
  variants: FILE_BADGES,
  // A zipped page; the zipper pull slides down on hover.
  svg: (u) => typedPage(u, `<path d="${TEETH}" ${WHITE}/>
    <g data-n="pull"><path d="${rr(10.6, 0, 6, 7, CR)}" fill="#fff"/><path d="${rr(12.8, 2.2, 1.6, 3, 0.8)}" ${DEEP}/></g>`),
  target: (h) => ({ y: h ? 14.4 : 11.8 }),
  draw(p, E) { at(E.pull, { transform: `translate(0 ${f(p.y)})` }); }
});
