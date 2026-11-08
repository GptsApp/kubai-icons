import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(5.2, 3.4, 20.6, 19.4, KR), HEAD = rp(R(5.2, 3.4, 20.6, 5), [KR, KR, 0, 0]);
const RING = rr(10.4, 1.6, 1.8, 3.8, 0.9) + rr(18.8, 1.6, 1.8, 3.8, 0.9);
const CX = [7.4, 11.8, 16.2, 20.6], CY = [10.4, 14.33, 18.27], W = 3, H = 2.53;
const CELLS = CY.map((y) => CX.map((x) => rr(x, y, W, H, 0.7)).join('')).join('');

export default defineIcon({
  name: 'calendar-days',
  zh: '月历',
  category: 'time',
  tags: ['calendar', 'month', 'date', 'schedule', 'days', 'planner', '日程'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'clock', 'star', 'heart', 'search', 'lock', 'sync'],
  // A month grid with today marked; on hover the mark steps on to the next day.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${CELLS}" fill="#fff"/>
    <path data-n="today" ${DEEP}/>
    <g filter="${u.hi}"><path d="${HEAD}" fill="${u.upS}"/></g>
    <path d="${HEAD}" ${OL}/>
    <g data-n="rings"><path d="${RING}" fill="#fff"/><path d="${RING}" ${OL}/></g>`,
  target: (h) => ({ x: h ? CX[2] : CX[1], rings: h ? -0.6 : 0 }),
  draw(p, E) {
    at(E.today, { d: rr(p.x, CY[0], W, H, 0.7) });
    at(E.rings, { transform: `translate(0 ${f(p.rings)})` });
  }
});
