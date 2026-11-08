import { defineBadge, at, f, rp } from '../packages/core/src/kit.js';
import { disc, pop, INK } from './_disc.js';

const BOLT = rp([[0.9, -3.6], [-2.2, 0.6], [-0.1, 0.6], [-0.9, 3.6], [2.2, -0.6], [0.1, -0.6]], [0.4, 0.4, 0.2, 0.4, 0.4, 0.2]);
export default defineBadge({
  name: 'bolt',
  zh: '闪电',
  tone: '#D97706',
  tags: ['flash', 'power', 'charge', 'fast', 'energy', 'lightning'],
  // The bolt strikes down a little on hover.
  svg: (u) => disc(u, `<path data-n="kbM" d="${BOLT}" ${INK}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, y: h ? 0.8 : 0, k: h ? 1.1 : 1 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `translate(0 ${f(p.y)}) scale(${f(p.k)})` }); }
});
