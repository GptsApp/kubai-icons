import { defineIcon, f, WHITE, rp, at, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// A capital I with serifs, upright, built round its centre.
const I = rp([[-4.4, -6.8], [4.4, -6.8], [4.4, -4.4], [1.4, -4.4], [1.4, 4.4], [4.4, 4.4], [4.4, 6.8], [-4.4, 6.8], [-4.4, 4.4], [-1.4, 4.4], [-1.4, -4.4], [-4.4, -4.4]],
  [0.5, 0.5, 0.4, 0.3, 0.3, 0.4, 0.5, 0.5, 0.4, 0.3, 0.3, 0.4]);

export default defineIcon({
  name: 'italic',
  zh: '斜体',
  category: 'text',
  tags: ['italic', 'emphasis', 'slant', 'oblique', 'format', 'text', '倾斜'],
  // A letter I set in italic on a card; on hover it leans further, rocking past and back.
  svg: (u) => card(u, `<path data-n="i" d="${I}" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const k = -17 - 13 * p.o - 10 * bump(Math.max(0, Math.min(1, p.o)));
    at(E.i, { transform: `translate(15.5 12.5) skewX(${f(k)})` });
  }
});
