import { defineBadge, at, f, rp } from '../packages/core/src/kit.js';
import { disc, pop, INK } from './_disc.js';

const SPARK = rp([[0, -3.6], [1, -1], [3.6, 0], [1, 1], [0, 3.6], [-1, 1], [-3.6, 0], [-1, -1]], [0.3, 0.9, 0.3, 0.9, 0.3, 0.9, 0.3, 0.9]);
export default defineBadge({
  name: 'sparkle',
  zh: '智能',
  tone: '#7C3AED',
  tags: ['ai', 'magic', 'sparkle', 'smart', 'generate', 'new'],
  // The sparkle turns and glints on hover.
  svg: (u) => disc(u, `<path data-n="kbM" d="${SPARK}" ${INK}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, r: h ? 90 : 0, k: h ? 1.12 : 1 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `rotate(${f(p.r)}) scale(${f(p.k)})` }); }
});
