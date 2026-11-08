import { defineIcon, KR, f, OL, DEEPS, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { polar } from './_security-time-health.js';

const DOME = 'M9.4 18.8V14.4A6.1 6.1 0 0 1 21.6 14.4V18.8Z';
const BASE = rr(5.2, 18.2, 20.6, 4.6, KR);

export default defineIcon({
  name: 'siren',
  zh: '警报',
  category: 'security',
  tags: ['alarm', 'alert', 'emergency', 'beacon', 'police', '警灯'],
  off: true,
  // A beacon on its base; on hover the dome lights up and its rays flash outward.
  svg: (u) => `
    <path data-n="rays" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${DOME}" fill="${u.upS}"/></g></g>
    <path data-n="lit" d="${DOME}" fill="${u.pure('#4389FF')}" opacity="0"/>
    <path d="${DOME}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BASE}" fill="${u.loS}"/></g></g>
    <path d="${BASE}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0, r1: h ? 10.8 : 10.4, r2: h ? 13 : 12.2 }),
  draw(p, E) {
    at(E.rays, { d: [-90, -45, 0, 45, 90].map((a) => { const s = polar(15.5, 14.4, p.r1, a), t = polar(15.5, 14.4, p.r2, a); return `M${f(s[0])} ${f(s[1])}L${f(t[0])} ${f(t[1])}`; }).join('') });
    at(E.lit, { opacity: f(0.9 * clamp01(p.o)) });
  }
});
