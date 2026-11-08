import { defineIcon, f, OL, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { stage } from './_security-time-health.js';

const PLATES = rr(6.6, 1, 17.8, 3.2, 1.6) + rr(6.6, 20.8, 17.8, 3.2, 1.6);
// Two bulbs, symmetric under a half turn about the centre.
const GLASS = 'M9 3.6H22V6.4C22 9.6 17.6 10.8 17.6 12.5C17.6 14.2 22 15.4 22 18.6V21.4H9V18.6C9 15.4 13.4 14.2 13.4 12.5C13.4 10.8 9 9.6 9 6.4Z';
const HA = 4.2, HB = 4.4;

export default defineIcon({
  name: 'hourglass',
  zh: '沙漏',
  category: 'time',
  tags: ['sand timer', 'wait', 'loading', 'pending', 'time', '等待'],
  // An hourglass with sand in both bulbs; on hover it is turned over and the sand
  // settles again.
  svg: (u) => `<clipPath id="${u.id('gl')}"><path d="${GLASS}"/></clipPath>
    <g filter="${u.sh}"><g data-n="g0"><path d="${GLASS}" fill="#fff"/></g></g>
    <g data-n="g1"><g clip-path="url(#${u.id('gl')})" fill="${u.loS}">
      <path data-n="sa" d="${rr(8, 0, 15, HA, 0)}"/><path data-n="sb" d="${rr(8, 0, 15, HB, 0)}"/></g>
      <path d="${GLASS}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="g2"><path d="${PLATES}" fill="${u.loS}"/></g></g></g>
    <g data-n="g3"><path d="${PLATES}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // First the half turn, carrying the packed sand; then each heap drops to the
    // lower end of its bulb.
    const o = clamp01(p.o), t = `rotate(${f(180 * stage(o, 0, 0.62))} 15.5 12.5)`, s = stage(o, 0.62, 1);
    ['g0', 'g1', 'g2', 'g3'].forEach((n) => at(E[n], { transform: t }));
    at(E.sa, { transform: `translate(0 ${f(12.5 - HA + (3.6 - 12.5 + HA) * s)})` });
    at(E.sb, { transform: `translate(0 ${f(21.4 - HB + (12.5 - 21.4 + HB) * s)})` });
  }
});
