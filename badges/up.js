import { defineBadge, at, f, arrow } from '../packages/core/src/kit.js';
import { disc, pop, INK, INKS } from './_disc.js';

const A = arrow(0, 2.8, 0, -3, 3, 2.7);
export default defineBadge({
  name: 'up',
  zh: '上移',
  tone: '#2563EB',
  tags: ['up', 'upload', 'raise', 'arrow up', 'export'],
  // The arrow rises on hover.
  svg: (u) => disc(u, `<g data-n="kbM"><path d="${A.shaft}" fill="none" stroke-width="2.2" stroke-linecap="round" ${INKS}/><path d="${A.head}" ${INK}/></g>`),
  target: (h) => ({ s: h ? 1.14 : 1, y: h ? -1.1 : 0 }),
  draw(p, E) { at(E.kbG, { transform: pop(p.s) }); at(E.kbM, { transform: `translate(0 ${f(p.y)})` }); }
});
