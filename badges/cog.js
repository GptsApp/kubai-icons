import { defineBadge, at, f, gear, circ } from '../packages/core/src/kit.js';
import { disc, pop, INK } from './_disc.js';

export default defineBadge({
  name: 'cog',
  zh: '设置',
  tone: '#475569',
  tags: ['settings', 'config', 'preferences', 'gear', 'manage'],
  // The gear turns on hover.
  svg: (u) => disc(u, `<path data-n="kbM" d="${gear(6, 3.6, 2.6, 0, 0) + circ(0, 0, 1.2)}" fill-rule="evenodd" ${INK}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, r: h ? 60 : 0 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `rotate(${f(p.r)})` }); }
});
