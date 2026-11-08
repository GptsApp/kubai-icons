import { defineBadge, at, f, arrow } from '../packages/core/src/kit.js';
import { disc, pop, INK, INKS } from './_disc.js';

const A = arrow(-2.8, 0, 3, 0, 3, 2.7);
export default defineBadge({
  name: 'right',
  zh: '转到',
  tone: '#2563EB',
  tags: ['right', 'forward', 'move', 'send', 'go', 'arrow right'],
  // The arrow heads on on hover.
  svg: (u) => disc(u, `<g data-n="kbM"><path d="${A.shaft}" fill="none" stroke-width="2.2" stroke-linecap="round" ${INKS}/><path d="${A.head}" ${INK}/></g>`),
  target: (h) => ({ s: h ? 1.14 : 1, x: h ? 1.1 : 0 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `translate(${f(p.x)} 0)` }); }
});
