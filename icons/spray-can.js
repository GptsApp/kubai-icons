import { defineIcon, f, OL, DEEP, R, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';

const BODY = rr(6.4, 8.2, 12.4, 15.6, 2.2);
const CAP = rp(R(8.2, 4.2, 8.8, 4.6), [1.8, 1.8, 0, 0]);
const DOTS = [[21.4, 4.4], [24.8, 2], [25, 6.8], [28, 4.4]];

export default defineIcon({
  name: 'spray-can',
  zh: '喷漆',
  category: 'tools',
  tags: ['spray', 'paint', 'aerosol', 'graffiti', '喷雾'],
  // An aerosol can; on hover its button is pressed and a mist of paint comes out.
  svg: (u) => `<g data-n="bt"><path d="${rr(10.6, 1.2, 5, 3.8, 0.9)}" fill="${u.loS}"/><path d="${rr(10.6, 1.2, 5, 3.8, 0.9)}" ${OL}/></g>
    <g filter="${u.hi}"><path d="${CAP}" fill="${u.upS}"/></g><path d="${CAP}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.lo(15.6)}"/></g></g><path d="${BODY}" ${OL}/>
    <path d="${R(6.4, 12.2, 12.4, 6.2).length && rr(6.4, 12.2, 12.4, 6.4, 0)}" fill="#fff"/>
    ${DOTS.map((d, i) => `<circle data-n="m${i}" cx="${d[0]}" cy="${d[1]}" ${DEEP}/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.bt, { transform: `translate(0 ${f(0.8 * Math.min(1, o * 3))})` });
    DOTS.forEach((d, i) => at(E['m' + i], { r: f(1.3 * clamp01(o * 2.2 - i * 0.35)) }));
  }
});
