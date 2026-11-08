import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { turning, polygon } from './_science-edu-sports.js';

export default defineIcon({
  name: 'pentagon',
  zh: '五边形',
  category: 'shapes',
  tags: ['shape', 'polygon', '多边形'],
  // A pentagon with a lighter copy inset; on hover the two turn a fifth in opposite directions.
  svg: (u) => turning(u, polygon(5, 12.4, 0, 0, 0, 2.4), polygon(5, 6, 0, 0, 0, 1.2)),
  target: (h) => ({ a: h ? 72 : 0 }),
  draw(p, E) {
    const t = (a) => `translate(15.5 13.69) rotate(${f(a)})`;
    at(E.o, { transform: t(p.a) }); at(E.oO, { transform: t(p.a) });
    at(E.i, { transform: t(-p.a) }); at(E.iO, { transform: t(-p.a) });
  }
});
