import { defineBadge, at, f, clamp01, rattle } from '../packages/core/src/kit.js';
import { disc, pop, INKS } from './_disc.js';

export default defineBadge({
  name: 'x',
  zh: '关闭',
  tone: '#DC2626',
  tags: ['close', 'cancel', 'remove', 'error', 'x', 'delete'],
  // The cross shakes side to side on hover, like a head saying no.
  svg: (u) => disc(u, `<path data-n="kbM" d="M-1.9 -1.9L1.9 1.9M1.9 -1.9L-1.9 1.9" fill="none" stroke-width="2.2" stroke-linecap="round" ${INKS}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, o: h ? 1 : 0 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `rotate(${f(rattle(clamp01(p.o), 18, 3))})` }); }
});
