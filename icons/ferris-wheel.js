import { defineIcon, f, OL, DEEP, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';
import { polar } from './_travel-transport.js';

const CX = 15.5, CY = 10.2, RO = 8.8, RI = 6.4;

export default defineIcon({
  name: 'ferris-wheel',
  zh: '摩天轮',
  category: 'travel',
  tags: ['amusement park', 'fair', 'ride', 'theme park', 'attraction', '游乐园'],
  // A Ferris wheel on its stand; on hover it turns, its cabins hanging level as they go.
  svg: (u) => {
    const ring = circ(CX, CY, RO);
    const spokes = [0, 90].map((a) => { const p = polar(CX, CY, RI, a), q = polar(CX, CY, RI, a + 180); return `M${f(p[0])} ${f(p[1])}L${f(q[0])} ${f(q[1])}`; }).join('');
    const cabins = [0, 1, 2, 3].map((i) => `<path data-n="c${i}" d="${rr(-2, -1.6, 4, 3.6, 1.2)}" ${DEEP}/>`).join('');
    return `<path d="M15.5 10.2L9 23.4M15.5 10.2L22 23.4M7 23.4H24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${ring}" fill="${u.loS}"/></g></g><path d="${ring}" ${OL}/>
      <path d="${circ(CX, CY, RI)}" fill="#fff"/>
      <g data-n="w"><path d="${spokes}" fill="none" stroke-width="1.6" ${DEEPS}/></g>${cabins}`;
  },
  target: (h) => ({ a: h ? 90 : 0 }),
  draw(p, E) {
    at(E.w, { transform: `rotate(${f(p.a)} ${CX} ${CY})` });
    for (let i = 0; i < 4; i++) {
      const q = polar(CX, CY, RO, -90 + i * 90 + p.a);
      at(E['c' + i], { transform: `translate(${f(q[0])} ${f(q[1])})` });
    }
  }
});
