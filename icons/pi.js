import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { tile, STROKE } from './_arrows.js';

export default defineIcon({
  name: 'pi',
  zh: '圆周率',
  category: 'science',
  tags: ['pi', 'math', 'constant', 'circle', 'geometry', '派', '数学'],
  // A card with the letter pi; on hover its legs lean forward as in italic type.
  svg: (u) => `${tile(u)}<path data-n="s" ${STROKE}/>`,
  target: (h) => ({ k: h ? 1.6 : 0 }),
  draw(p, E) {
    const k = p.k;
    at(E.s, { d: `M9.6 9.6Q10.4 8.2 12 8.2H21.4M13.4 8.2L${f(13 - k)} 17.6M17.8 8.2L${f(17.8 - k * 0.6)} 15.8Q${f(17.8 - k * 0.6)} 17.6 ${f(19.4 - k * 0.4)} 17.6Q${f(20.6 - k * 0.2)} 17.6 21.2 16.6` });
  }
});
