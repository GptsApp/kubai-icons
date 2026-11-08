import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'fuel',
  zh: '加油站',
  category: 'transport',
  tags: ['gas', 'petrol', 'gas station', 'refuel', 'diesel', 'pump', '加油'],
  variants: ['check', 'clock'],
  // A fuel pump with its nozzle on a hose; on hover the nozzle rises on its hose and the
  // meter on its display runs up.
  svg: (u) => {
    const body = rr(5.8, 2, 12.8, 21.6, KR), nozzle = rp(R(22.2, 3.6, 4, 5.4), [1.2, 1.2, 1, 1]);
    return `<path data-n="hose" d="M18 17.6H21.8Q24.2 17.6 24.2 15.2V8" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.hi}"><path data-n="nz" d="${nozzle}" fill="${u.upS}"/></g><path data-n="nzO" d="${nozzle}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.lo(21.6)}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(8.4, 4.6, 7.6, 6.2, CR)}" fill="#fff"/>
      <path data-n="bar" ${DEEP}/>`;
  },
  target: (h) => ({ w: h ? 4.8 : 2.6, ny: h ? -3.4 : 0 }),
  draw(p, E) {
    const nozzle = rp(R(22.2, 3.6 + p.ny, 4, 5.4), [1.2, 1.2, 1, 1]);
    at(E.nz, { d: nozzle }); at(E.nzO, { d: nozzle });
    at(E.hose, { d: `M18 17.6H21.8Q24.2 17.6 24.2 15.2V${f(8 + p.ny)}` });
    at(E.bar, { d: rr(9.8, 6.5, p.w, 2.4, 1.2) });
  }
});
