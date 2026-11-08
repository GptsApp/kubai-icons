import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { tile, STROKE, swell } from './_arrows.js';

export default defineIcon({
  name: 'sigma',
  zh: '求和',
  category: 'science',
  tags: ['sum', 'sigma', 'total', 'math', 'formula', '总和', '数学'],
  // A card with a sigma; on hover the sigma swells taller and wider as the sum grows,
  // then settles a little larger.
  svg: (u) => `${tile(u)}<path data-n="s" ${STROKE}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const e = 0.6 * p.o + 0.8 * swell(p.o);
    const r = 19.6 + 1.2 * e, l = 11.2 - 0.6 * e, m = 16 + 0.5 * e, t = 7.6 - 0.75 * e, b = 17.4 + 0.75 * e;
    at(E.s, { d: `M${f(r)} ${f(t)}H${f(l)}L${f(m)} 12.5L${f(l)} ${f(b)}H${f(r)}` });
  }
});
