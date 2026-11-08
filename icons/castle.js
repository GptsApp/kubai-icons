import { defineIcon, KR, f, DEEP, DEEPS, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

// The keep: two merlons either side of a gap the flagpole rises through.
const KEEP = rp([[11.2, 22.6], [11.2, 6.4], [14.3, 6.4], [14.3, 8.8], [16.7, 8.8], [16.7, 6.4], [19.8, 6.4], [19.8, 22.6]], [0, 1, 0.4, 0.4, 0.4, 0.4, 1, 0]);
// Two crenellated towers joined by the gate wall.
const WALL = rp([[3.8, 22.6], [3.8, 9], [5.8, 9], [5.8, 11.4], [8.2, 11.4], [8.2, 9], [10.2, 9], [10.2, 14], [20.8, 14], [20.8, 9], [22.8, 9], [22.8, 11.4], [25.2, 11.4], [25.2, 9], [27.2, 9], [27.2, 22.6]],
  [KR, 1, 0.4, 0.4, 0.4, 0.4, 1, 0.4, 0.4, 1, 0.4, 0.4, 0.4, 0.4, 1, KR]);
const GATE = 'M13.2 22.6V19.1A2.3 2.3 0 0 1 17.8 19.1V22.6Z';

export default defineIcon({
  name: 'castle',
  zh: '城堡',
  category: 'travel',
  tags: ['fortress', 'palace', 'kingdom', 'landmark', 'sightseeing', 'medieval', '古堡'],
  // A castle keep behind two towers and a gate; on hover the flag on the keep swings right
  // round its pole in the wind and back, rippling as it goes.
  svg: (u) => `<path d="M15.5 0.6V8.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <path data-n="fl" ${DEEP}/>
    ${back(u, KEEP, u.loS)}
    ${front(u, WALL, u.upS)}
    <path d="${GATE}" fill="${u.pure('#2F6FE0')}"/>
    <path d="${rp([[6.2, 15], [7.8, 15], [7.8, 18.6], [6.2, 18.6]], 0.8) + rp([[23.2, 15], [24.8, 15], [24.8, 18.6], [23.2, 18.6]], 0.8)}" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 2, 3), b = rattle(o, 1.5, 2), c = Math.cos(2 * Math.PI * o), s = Math.sign(c || 1) * Math.max(0.12, Math.abs(c));
    const x = (d) => f(15.5 + d * s);
    at(E.fl, { d: `M15.5 0.6Q${x(2.3)} ${f(0.6 - a)} ${x(4.9)} ${f(0.6 + b)}V${f(3.6 + b)}Q${x(2.3)} ${f(3.6 - a)} 15.5 3.6Z` });
  }
});
