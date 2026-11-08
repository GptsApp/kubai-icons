import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

const COLONIES = [[11.8, 10.4], [19.2, 15.2], [13.2, 17.4], [19.4, 8.6], [16.2, 12.8]];

export default defineIcon({
  name: 'petri-dish',
  zh: '培养皿',
  category: 'science',
  tags: ['biology', 'culture', 'lab', 'bacteria', '生物', '细菌'],
  // A dish of agar seen from above; on hover the colonies grow large and a new one appears.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.upS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <g filter="${u.hi}"><path d="${circ(15.5, 12.5, 8.6)}" fill="${u.loS}"/></g><path d="${circ(15.5, 12.5, 8.6)}" ${OL}/>
    ${COLONIES.map((c, i) => `<circle data-n="c${i}" cx="${c[0]}" cy="${c[1]}" fill="#fff" data-w="fill"/>`).join('')}`,
  target: (h) => ({ r: h ? [3.2, 2.6, 2, 2, 1.5] : [2, 1.6, 1.2, 1.2, 0] }),
  draw(p, E) { p.r.forEach((r, i) => at(E[`c${i}`], { r: f(Math.max(0, r)) })); }
});
