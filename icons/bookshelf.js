import { defineIcon, KR, CR, f, DEEP, SOFT, rr, at } from '../packages/core/src/kit.js';
import { back } from './_b1-home.js';

const W = 2.6, TOP = 11.4, LOW = 21.8;
const OPEN = rr(7.4, 3.2, 16.2, 8.2, CR) + rr(7.4, 13.6, 16.2, 8.2, CR);
const book = (x, floor, h, tone, extra = '') => `<path ${extra} d="${rr(x, floor - h, W, h, 0.4)}" ${tone}/>`;
const TIP_X = 17.8, TIP_H = 6.6;

export default defineIcon({
  name: 'bookshelf',
  zh: '书架',
  category: 'home',
  tags: ['books', 'library', 'shelves', 'bookcase', 'reading', 'furniture', '书柜', '藏书', '家具'],
  // A bookcase of two shelves holding narrow books of uneven height; on hover the last book on top tips over.
  svg: (u) => `${back(u, rr(5.2, 1, 20.6, 23, KR))}
      <path d="${OPEN}" fill="#fff"/>
      <clipPath id="${u.id('open')}"><path d="${OPEN}"/></clipPath>
      <g clip-path="url(#${u.id('open')})">
        ${book(7.4, TOP, 7, DEEP)}${book(10, TOP, 5.4, SOFT)}${book(12.6, TOP, 7.4, DEEP)}${book(15.2, TOP, 5, SOFT)}
        ${book(TIP_X, TOP, TIP_H, DEEP, 'data-n="tip"')}
        ${book(9, LOW, 6.4, DEEP, `transform="rotate(14 9 ${LOW})"`)}
        ${book(13.2, LOW, 7.2, SOFT)}${book(15.8, LOW, 5.2, DEEP)}${book(18.4, LOW, 7.4, SOFT)}${book(21, LOW, 6, DEEP)}
      </g>`,
  target: (h) => ({ a: h ? 18 : 0 }),
  draw(p, E) { at(E.tip, { transform: `rotate(${f(p.a)} ${TIP_X + W} ${TOP})` }); }
});
