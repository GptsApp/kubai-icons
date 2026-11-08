import { defineBadge, at, f } from '../packages/core/src/kit.js';
import { disc, pop, INKS } from './_disc.js';

export default defineBadge({
  name: 'plus',
  zh: '添加',
  tone: '#16A34A',
  tags: ['add', 'new', 'create', 'plus'],
  // The plus swells on hover.
  svg: (u) => disc(u, `<path data-n="kbM" d="M-2.5 0H2.5M0 -2.5V2.5" fill="none" stroke-width="2.2" stroke-linecap="round" ${INKS}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, k: h ? 1.15 : 1 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `scale(${f(p.k)})` }); }
});
