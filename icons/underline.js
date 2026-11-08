import { defineIcon, f, WHITE, R, rp, at, clamp01, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';
import { ribbon, arcPts } from './_w2-interface.js';

// A letter U: two stems joined by a round bottom, with the line set below it.
const U = ribbon([[-3.4, -8], ...arcPts(0, -1, 3.4, 180, 0, 18), [3.4, -8]], 2.8);

export default defineIcon({
  name: 'underline',
  zh: '下划线',
  category: 'text',
  tags: ['underline', 'underscore', 'format', 'text', '底线'],
  // An underlined letter U on a card; on hover the letter lifts while its underline is taken back to a dot and drawn again, wider, from the left.
  svg: (u) => card(u, `<path data-n="u" d="${U}" transform="translate(15.5 12.5)" ${WHITE}/><path data-n="ln" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), L0 = 15.5 - 5.4, L1 = 15.5 - 7.8, A = 0.35;
    let x, w;
    if (o < A) { const t = o / A; x = L0 + (L1 - L0) * t; w = 2 * 5.4 + (2.4 - 2 * 5.4) * t; }
    else { const t = (o - A) / (1 - A); x = L1; w = 2.4 + (2 * 7.8 - 2.4) * t; }
    at(E.u, { transform: `translate(15.5 ${f(12.5 - 1.2 * bump(o))})` });
    at(E.ln, { d: rp(R(x, 18.4, w, 2.4), 1.2) });
  }
});
