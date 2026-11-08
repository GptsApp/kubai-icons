import { defineIcon, f, OL, DEEPS, rp, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { retrace, dashOff } from './_security-time-health.js';

const ROSETTE = rp(Array.from({ length: 24 }, (_, i) => {
  const a = i * Math.PI / 12, r = i % 2 ? 9.8 : 11.4;
  return [15.5 + r * Math.sin(a), 12.5 - r * Math.cos(a)];
}), 1.5);
const DISC = circ(15.5, 12.5, 6.8);

export default defineIcon({
  name: 'badge-verified',
  zh: '认证徽章',
  category: 'security',
  tags: ['verified', 'badge', 'certified', 'approved', 'official', 'seal', '认证'],
  // A scalloped seal with a tick; on hover the seal turns and the tick is written again.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="ro"><path d="${ROSETTE}" fill="${u.loS}"/></g></g></g>
    <g data-n="roO"><path d="${ROSETTE}" ${OL}/></g>
    <g filter="${u.hi}"><path d="${DISC}" fill="${u.upS}"/></g>
    <path d="${DISC}" ${OL}/>
    <path data-n="tick" d="M12.4 12.8L14.6 15L18.6 10.8" pathLength="10" stroke-dasharray="10 10" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), t = `rotate(${f(30 * o)} 15.5 12.5)`;
    at(E.ro, { transform: t }); at(E.roO, { transform: t });
    at(E.tick, { 'stroke-dashoffset': dashOff(retrace(o)) });
  }
});
