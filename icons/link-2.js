import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_interface.js';
import { ribbon, arcPts } from './_w2-interface.js';

// The left bracket of the chain, opening to the right; the right one is its mirror image.
const LEFT = ribbon([[12.4, 8], ...arcPts(9.4, 12.5, 4.5, -90, -270, 20), [12.4, 17]], 2.6, true);

export default defineIcon({
  name: 'link-2',
  zh: '链接',
  category: 'interface',
  tags: ['link', 'url', 'hyperlink', 'chain', 'connect', 'attach', '超链接'],
  variants: ['plus', 'x', 'check'],
  // Two open brackets of a chain with a straight bar between them; on hover the brackets draw in round the bar.
  svg: (u) => `<g data-n="l">${back(u, LEFT)}</g><g data-n="r">${back(u, LEFT)}</g>
    ${front(u, rr(10.9, 11.3, 9.2, 2.4, 1.2))}`,
  target: (h) => ({ d: h ? 0.9 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(p.d)} 0)` });
    at(E.r, { transform: `translate(${f(31 - p.d)} 0) scale(-1 1)` });
  }
});
