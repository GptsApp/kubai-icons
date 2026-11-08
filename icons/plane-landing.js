import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';
import { PLANE_SIDE } from './_travel-transport.js';

export default defineIcon({
  name: 'plane-landing',
  zh: '降落',
  category: 'transport',
  tags: ['arrival', 'landing', 'flight', 'airport', 'arrivals', '到达'],
  variants: ['check', 'clock', 'alert'],
  // An airliner coming in to land; on hover it levels out just above the runway.
  svg: (u) => `<path d="M4.6 23.2H26.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="p"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PLANE_SIDE.body}" fill="${u.loS}"/></g></g><path d="${PLANE_SIDE.body}" ${OL}/>
      <g filter="${u.hi}"><path d="${PLANE_SIDE.wing}" fill="${u.upS}"/></g><path d="${PLANE_SIDE.wing}" ${OL}/></g>`,
  target: (h) => ({ p: h ? [16.2, 12.4, 2] : [15.2, 9.8, 16] }),
  draw(p, E) { at(E.p, { transform: `translate(${f(p.p[0])} ${f(p.p[1])}) rotate(${f(p.p[2])})` }); }
});
