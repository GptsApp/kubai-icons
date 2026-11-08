import { defineIcon, f, WHITES, at, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';
import { X, TWO } from './_w2-interface.js';

export default defineIcon({
  name: 'superscript',
  zh: '上标',
  category: 'text',
  tags: ['superscript', 'sup', 'exponent', 'power', 'format', 'text', '上角标'],
  // A letter X with a small 2 set high beside it; on hover the 2 dips and springs up a step higher.
  svg: (u) => card(u, `${X(11.8, 14.2, 3.9)}<path data-n="n" d="${TWO}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), y = -0.9 * o + 2.8 * bump(o);
    at(E.n, { transform: `translate(20.8 ${f(8.8 + y)})` });
  }
});
