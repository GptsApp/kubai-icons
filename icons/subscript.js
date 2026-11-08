import { defineIcon, f, WHITES, at, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';
import { X, TWO } from './_w2-interface.js';

export default defineIcon({
  name: 'subscript',
  zh: '下标',
  category: 'text',
  tags: ['subscript', 'sub', 'index', 'formula', 'format', 'text', '下角标'],
  // A letter X with a small 2 set low beside it; on hover the 2 hops and lands a step lower.
  svg: (u) => card(u, `${X(11.8, 10.8, 3.9)}<path data-n="n" d="${TWO}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), y = 1 * o - 2.6 * bump(o);
    at(E.n, { transform: `translate(20.8 ${f(16.4 + y)})` });
  }
});
