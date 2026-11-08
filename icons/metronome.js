import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, rp, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';

const BODY = rp([[12, 1], [19, 1], [24.4, 23.8], [6.6, 23.8]], [2.2, 2.2, KR, KR]);
const FACE = rp([[13.74, 3.2], [17.26, 3.2], [20.77, 18], [10.23, 18]], CR);
const FRONT = rp([[8.11, 17.4], [22.89, 17.4], [24.4, 23.8], [6.6, 23.8]], [1.8, 1.8, KR, KR]);

export default defineIcon({
  name: 'metronome',
  zh: '节拍器',
  category: 'time',
  tags: ['tempo', 'beat', 'rhythm', 'music', 'bpm', '节奏'],
  // A metronome; on hover its pendulum ticks from side to side and comes to rest upright.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${FACE}" fill="#fff"/>
    <g data-n="arm"><path d="M15.5 19.6V4.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path d="${rr(13.4, 7.4, 4.2, 3, 0.9)}" ${DEEP}/></g>
    <g filter="${u.hi}"><path d="${FRONT}" fill="${u.upS}"/></g>
    <path d="${FRONT}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.arm, { transform: `rotate(${f(rattle(clamp01(p.o), 20, 3))} 15.5 19.6)` }); }
});
