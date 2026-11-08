import { defineIcon, f, OL, DEEPS, at, clamp01 } from '../packages/core/src/kit.js';
import { retrace, dashOff } from './_security-time-health.js';

const HEART = 'M0 9.6C-5.5 5.6 -10.9 1.4 -10.9 -3.6C-10.9 -7 -8.3 -9.6 -5.1 -9.6C-2.9 -9.6 -1.1 -8.4 0 -6.6C1.1 -8.4 2.9 -9.6 5.1 -9.6C8.3 -9.6 10.9 -7 10.9 -3.6C10.9 1.4 5.5 5.6 0 9.6Z';

export default defineIcon({
  name: 'heart-pulse',
  zh: '心率',
  category: 'health',
  tags: ['heart rate', 'pulse', 'ecg', 'cardio', 'health', 'vital', '心跳'],
  variants: ['plus', 'alert'],
  // A heart crossed by a pulse trace; on hover it beats and the trace is written again.
  svg: (u) => `<g data-n="g">
      <clipPath id="${u.id('half')}"><rect x="0" y="-12" width="12" height="24"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEART}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('half')})"><g filter="${u.hi}"><path d="${HEART}" fill="${u.upS}"/></g></g>
      <path d="${HEART}" ${OL}/>
      <path data-n="ecg" d="M-7.6 -1.4H-4.4L-2.2 -5.2L1 2.6L3.2 -1.4H7.6" pathLength="10" stroke-dasharray="10 10" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    </g>`,
  target: (h) => ({ s: h ? 1.08 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(15.5 13.2) scale(${f(p.s)})` });
    at(E.ecg, { 'stroke-dashoffset': dashOff(retrace(clamp01(p.o))) });
  }
});
