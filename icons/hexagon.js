import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { turning, polygon } from './_science-edu-sports.js';

export default defineIcon({
  name: 'hexagon',
  zh: '六边形',
  category: 'shapes',
  tags: ['hex', 'shape', 'cell', 'honeycomb', '六角形'],
  // A hexagon with a lighter copy inset; on hover the two turn a sixth in opposite directions.
  svg: (u) => turning(u, polygon(6, 12, 0, 0, 0, 2.4), polygon(6, 5.8, 0, 0, 0, 1.2)),
  target: (h) => ({ a: h ? 60 : 0 }),
  draw(p, E) {
    const t = (a) => `translate(15.5 12.5) rotate(${f(a)})`;
    at(E.o, { transform: t(p.a) }); at(E.oO, { transform: t(p.a) });
    at(E.i, { transform: t(-p.a) }); at(E.iO, { transform: t(-p.a) });
  }
});
