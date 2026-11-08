import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';
import { PLANE_SIDE } from './_travel-transport.js';

export default defineIcon({
  name: 'plane-takeoff',
  zh: '起飞',
  category: 'transport',
  tags: ['departure', 'takeoff', 'flight', 'airport', 'departures', '出发'],
  variants: ['check', 'clock', 'alert'],
  // An airliner lifting off the runway; on hover it pitches up and climbs away.
  svg: (u) => `<path d="M4.6 23.2H26.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="p"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PLANE_SIDE.body}" fill="${u.loS}"/></g></g><path d="${PLANE_SIDE.body}" ${OL}/>
      <g filter="${u.hi}"><path d="${PLANE_SIDE.wing}" fill="${u.upS}"/></g><path d="${PLANE_SIDE.wing}" ${OL}/></g>`,
  target: (h) => ({ p: h ? [16.6, 9, -28] : [15.4, 11.2, -20] }),
  draw(p, E) { at(E.p, { transform: `translate(${f(p.p[0])} ${f(p.p[1])}) rotate(${f(p.p[2])})` }); }
});
