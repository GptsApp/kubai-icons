import { defineIcon, f, OL, DEEPS, WHITES, at, clamp01 } from '../packages/core/src/kit.js';
import { retrace, dashOff } from './_security-time-health.js';

// The left hemisphere; the right one is its mirror image.
const HEMI = 'M15 3.4C13 2.2 10 2.6 9 4.8C6.4 5 4.8 7.6 5.6 10.2C3.8 11.8 3.8 15.4 6.2 16.8C6 19.8 8.6 22 11.4 21.2C12.4 22.8 14.2 23 15 22.4Z';
const FOLD = 'M11.4 6.2C8.6 7.8 8.6 11.2 11.2 12.6C13.4 13.8 13.2 16.8 10.8 18.4';
const MIRROR = 'translate(31 0) scale(-1 1)';

export default defineIcon({
  name: 'brain',
  zh: '大脑',
  category: 'health',
  tags: ['mind', 'neurology', 'think', 'intelligence', 'mental', 'ai', '思考'],
  // A brain of two hemispheres; on hover it swells a little and its folds are traced again.
  svg: (u) => `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEMI}" fill="${u.loS}"/></g></g><path d="${HEMI}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEMI}" transform="${MIRROR}" fill="${u.upS}"/></g></g><path d="${HEMI}" transform="${MIRROR}" ${OL}/>
      <path data-n="fl" d="${FOLD}" pathLength="10" stroke-dasharray="10 10" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
      <path data-n="fr" d="${FOLD}" transform="${MIRROR}" pathLength="10" stroke-dasharray="10 10" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    </g>`,
  target: (h) => ({ s: h ? 1.05 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(15.5 12.8) scale(${f(p.s)}) translate(-15.5 -12.8)` });
    const off = dashOff(retrace(clamp01(p.o)));
    at(E.fl, { 'stroke-dashoffset': off }); at(E.fr, { 'stroke-dashoffset': off });
  }
});
