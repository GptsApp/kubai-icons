import { defineIcon, f, WHITE, at } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// An opening quotation mark: a round head with a tail that curls up to the right.
const mark = `M2.7 0A2.7 2.7 0 1 1 -2.7 0C-2.7 -3.2 -1 -5.6 2 -6.6L2.6 -5.1C0.9 -4.3 0.2 -3.4 0 -2.7C1.5 -2.6 2.7 -1.4 2.7 0Z`;

export default defineIcon({
  name: 'quote',
  zh: '引用',
  category: 'text',
  tags: ['quote', 'quotation', 'blockquote', 'citation', 'testimonial', '引号'],
  // A pair of quotation marks on a card; on hover they hop one after the other.
  svg: (u) => card(u, `<path data-n="q0" d="${mark}" ${WHITE}/><path data-n="q1" d="${mark}" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const hop = (t) => -3.4 * Math.sin(Math.PI * Math.max(0, Math.min(1, t)));
    at(E.q0, { transform: `translate(11.6 ${f(15.4 + hop(o * 1.6))})` });
    at(E.q1, { transform: `translate(19.4 ${f(15.4 + hop(o * 1.6 - 0.6))})` });
  }
});
