import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { turning, polygon } from './_science-edu-sports.js';

export default defineIcon({
  name: 'octagon',
  zh: '八边形',
  category: 'shapes',
  tags: ['shape', 'polygon', 'stop', '八角形'],
  // An octagon with a lighter copy inset; on hover the two turn an eighth in opposite directions.
  svg: (u) => turning(u, polygon(8, 12.2, 0, 0, 22.5, 2.4), polygon(8, 6, 0, 0, 22.5, 1.2)),
  target: (h) => ({ a: h ? 45 : 0 }),
  draw(p, E) {
    const t = (a) => `translate(15.5 12.5) rotate(${f(a)})`;
    at(E.o, { transform: t(p.a) }); at(E.oO, { transform: t(p.a) });
    at(E.i, { transform: t(-p.a) }); at(E.iO, { transform: t(-p.a) });
  }
});
