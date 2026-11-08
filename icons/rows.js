import { defineIcon, CR, f, rr, at } from '../packages/core/src/kit.js';
import { TILE, back } from './_interface.js';

export default defineIcon({
  name: 'rows',
  zh: '分行',
  category: 'layout',
  tags: ['rows', 'layout', 'stack', 'sections', '多行'],
  // Three rows on a page; on hover the middle one grows taller and the others make room.
  svg: (u) => `${back(u, TILE)}<path data-n="a" fill="#fff"/><path data-n="b" fill="#fff"/><path data-n="c" fill="#fff"/>`,
  target: (h) => ({ w: h ? [3.2, 5.4, 3.2] : [3.93, 3.93, 3.93] }),
  draw(p, E) {
    let y = 4.6;
    ['a', 'b', 'c'].forEach((n, i) => { at(E[n], { d: rr(7.6, y, 15.8, p.w[i], CR) }); y += p.w[i] + 2; });
  }
});
