import { defineIcon, f, WHITE, R, rp, at, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// A capital H: two stems and a bar, built round its centre.
const H = rp(R(-5.4, -6.8, 3, 13.6), 0.5) + rp(R(2.4, -6.8, 3, 13.6), 0.5) + rp(R(-2.6, -1.3, 5.2, 2.6), 0);

export default defineIcon({
  name: 'heading',
  zh: '标题',
  category: 'text',
  tags: ['heading', 'title', 'header', 'h1', 'text', '大标题'],
  // A letter H on a card; on hover it grows a size past its mark and settles, as a heading set larger.
  svg: (u) => card(u, `<path data-n="h" d="${H}" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = 1 + 0.18 * p.o + 0.1 * bump(Math.max(0, Math.min(1, p.o)));
    at(E.h, { transform: `translate(15.5 12.5) scale(${f(s)})` });
  }
});
