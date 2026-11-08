import { defineBadge, at, f } from '../packages/core/src/kit.js';
import { disc, pop, INKS } from './_disc.js';

export default defineBadge({
  name: 'minus',
  zh: '移除',
  tone: '#DC2626',
  tags: ['remove', 'subtract', 'minus', 'delete'],
  // The bar narrows on hover, as if taking something away.
  svg: (u) => disc(u, `<path data-n="kbM" fill="none" stroke-width="2.2" stroke-linecap="round" ${INKS}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, w: h ? 1.8 : 2.6 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { d: `M${f(-p.w)} 0H${f(p.w)}` }); }
});
