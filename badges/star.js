import { defineBadge, at, f, star } from '../packages/core/src/kit.js';
import { disc, pop, INK } from './_disc.js';

export default defineBadge({
  name: 'star',
  zh: '星标',
  tone: '#D97706',
  tags: ['favorite', 'star', 'featured', 'rate', 'important'],
  // The star turns one point on hover.
  svg: (u) => disc(u, `<path data-n="kbM" d="${star(3.6, 1.6)}" transform="translate(0 0.3)" ${INK}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, r: h ? 72 : 0 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `translate(0 0.3) rotate(${f(p.r)})` }); }
});
