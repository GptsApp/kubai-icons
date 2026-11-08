import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(4, 5.6, 23, 14.6, KR), HEAD = rp(R(4, 5.6, 23, 5), [KR, KR, 0, 0]);
const RING = rr(10.4, 3.8, 1.8, 3.8, 0.9) + rr(18.8, 3.8, 1.8, 3.8, 0.9);
const W = 2.76, X = [0, 1, 2, 3, 4].map((i) => 6.2 + i * (W + 1.2)), Y = 12.6, H = 5.6;
const DAYS = X.map((x) => rr(x, Y, W, H, 0.8)).join('');

export default defineIcon({
  name: 'calendar-week',
  zh: '周历',
  category: 'time',
  tags: ['calendar', 'week', 'weekdays', 'schedule', 'planner', '本周'],
  variants: ['plus', 'check', 'clock', 'star', 'sync'],
  // A desk strip showing one week of days under its header, today filled in; on hover the
  // mark steps on to the next day.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${DAYS}" fill="#fff"/>
    <path data-n="today" ${DEEP}/>
    <g filter="${u.hi}"><path d="${HEAD}" fill="${u.upS}"/></g>
    <path d="${HEAD}" ${OL}/>
    <g data-n="rings"><path d="${RING}" fill="#fff"/><path d="${RING}" ${OL}/></g>`,
  target: (h) => ({ x: h ? X[2] : X[1], rings: h ? -0.6 : 0 }),
  draw(p, E) {
    at(E.today, { d: rr(p.x, Y, W, H, 0.8) });
    at(E.rings, { transform: `translate(0 ${f(p.rings)})` });
  }
});
