import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { turning, polygon } from './_science-edu-sports.js';

export default defineIcon({
  name: 'triangle',
  zh: '三角形',
  category: 'shapes',
  tags: ['shape', 'delta', 'warning', '三角'],
  // A triangle with a lighter triangle inset; on hover it turns a third round its centre.
  svg: (u) => turning(u, polygon(3, 13, 0, 0, 0, 2.6), polygon(3, 6.2, 0, 0, 0, 1.2)),
  target: (h) => ({ a: h ? 120 : 0 }),
  draw(p, E) {
    const t = (a) => `translate(15.5 15.75) rotate(${f(a)})`;
    at(E.o, { transform: t(p.a) }); at(E.oO, { transform: t(p.a) });
    at(E.i, { transform: t(-p.a) }); at(E.iO, { transform: t(-p.a) });
  }
});
