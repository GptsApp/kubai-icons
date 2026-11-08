import { defineIcon, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';
import { retrace, dashOff } from './_security-time-health.js';

const PAD = rr(6.3, 1, 18.4, 23, 9.2);
const FACE = rr(8.7, 3.4, 13.6, 18.2, 6.8);
const RIDGES = ['M11 19V12.6A4.5 4.5 0 0 1 20 12.6V15.4', 'M14.1 17.2V12.8A1.4 1.4 0 0 1 16.9 12.8V19'];

export default defineIcon({
  name: 'fingerprint',
  zh: '指纹',
  category: 'security',
  tags: ['touch id', 'biometric', 'identity', 'unlock', 'scan', '指纹识别'],
  // A fingertip pad with its ridges; on hover the ridges are traced again from end to end.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${PAD}" fill="${u.loS}"/></g></g>
    <path d="${PAD}" ${OL}/>
    <path d="${FACE}" fill="#fff"/>
    ${RIDGES.map((d, i) => `<path data-n="r${i}" d="${d}" pathLength="10" stroke-dasharray="10 10" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const off = dashOff(retrace(Math.max(0, Math.min(1, p.o))));
    at(E.r0, { 'stroke-dashoffset': off }); at(E.r1, { 'stroke-dashoffset': off });
  }
});
