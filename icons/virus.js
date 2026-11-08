import { defineIcon, f, circ, at } from '../packages/core/src/kit.js';
import { solid, node, move, MARK } from './_w2-dev.js';

const N = 6, BODY = circ(15.5, 12.5, 6.6);
const pt = (r, a) => [15.5 + r * Math.sin(a * Math.PI / 180), 12.5 - r * Math.cos(a * Math.PI / 180)];

export default defineIcon({
  name: 'virus',
  zh: '病毒',
  category: 'health',
  tags: ['virus', 'germ', 'infection', 'pathogen', 'covid', 'disease', '传染', '细菌'],
  // A virus with knobbed spikes; on hover it turns a little and pushes its spikes out.
  svg: (u) => `<path data-n="st" ${MARK}/>
    ${Array.from({ length: N }, (_, i) => node(u, 'k' + i, 2, u.upS)).join('')}
    ${solid(u, BODY, u.loS)}`,
  target: (h) => ({ a: h ? 30 : 0, r: h ? 10.2 : 9.4 }),
  draw(p, E) {
    let d = '';
    for (let i = 0; i < N; i++) {
      const a = p.a + i * 360 / N, s = pt(6, a), k = pt(p.r, a);
      d += `M${f(s[0])} ${f(s[1])}L${f(k[0])} ${f(k[1])}`;
      move(E, 'k' + i, k[0], k[1]);
    }
    at(E.st, { d });
  }
});
