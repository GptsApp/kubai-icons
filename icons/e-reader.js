import { defineIcon, KR, CR, f, DEEPS, SOFT, WHITE, rp, rr, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const SCREEN = rr(8.3, 3, 14.4, 16.2, CR);

export default defineIcon({
  name: 'e-reader',
  zh: '电子书阅读器',
  category: 'devices',
  tags: ['ebook', 'e-ink', 'reading', 'book', 'digital book', '电纸书', '墨水屏'],
  variants: ['plus', 'check', 'down'],
  // An e-reader with a page of text and a folded corner; on hover the page turns, a sheet
  // sweeping across the screen and leaving new lines behind.
  svg: (u) => `${back(u, rr(6.3, 1, 18.4, 23, KR))}
      <clipPath id="${u.id('s')}"><path d="${SCREEN}"/></clipPath>
      <path d="${SCREEN}" fill="#fff"/>
      <path data-n="tx" class="ln" ${DEEPS}/>
      <path d="${rp([[22.7, 14.2], [22.7, 19.2], [17.7, 19.2]], [0, 1.2, 0])}" ${SOFT}/>
      <g clip-path="url(#${u.id('s')})"><path data-n="sw" fill="${u.upS}"/></g>
      <path d="${rr(12.7, 20.6, 5.6, 2, 1)}" ${WHITE}/>`,
  target: (h) => ({ x: h ? 1 : 0 }),
  draw(p, E) {
    // The sheet enters from the right edge, covers the screen and leaves past the left one.
    const k = p.x, front = 22.7 - 32.8 * k;
    at(E.sw, { d: `M${f(front)} 2H${f(front + 18)}V20H${f(front)}Z` });
    const n = front < 6.5;
    at(E.tx, { d: n ? 'M11 7.4H20M11 11.4H16' : 'M11 7.4H20M11 11.4H18' });
  }
});
