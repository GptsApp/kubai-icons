import { defineIcon, CR, f, rr, at } from '../packages/core/src/kit.js';
import { TILE, back } from './_interface.js';

export default defineIcon({
  name: 'columns',
  zh: '分栏',
  category: 'layout',
  tags: ['columns', 'layout', 'three columns', 'grid', '多栏'],
  // Three columns on a page; on hover the middle one widens and the sides make room.
  svg: (u) => `${back(u, TILE)}<path data-n="a" fill="#fff"/><path data-n="b" fill="#fff"/><path data-n="c" fill="#fff"/>`,
  target: (h) => ({ w: h ? [3.2, 5.4, 3.2] : [3.93, 3.93, 3.93] }),
  draw(p, E) {
    let x = 7.6;
    ['a', 'b', 'c'].forEach((n, i) => { at(E[n], { d: rr(x, 4.6, p.w[i], 15.8, CR) }); x += p.w[i] + 2; });
  }
});
