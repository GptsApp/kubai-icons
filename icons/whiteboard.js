import { defineIcon, KR, CR, f, OL, ACC, DEEPS, rr, at } from '../packages/core/src/kit.js';

// The line drawn on the board, and its length.
const PTS = [[9.4, 14], [13.4, 10.2], [16.8, 12.8], [21.8, 7.6]];
const len = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
const LEN = len(PTS);
// The line rising a little further and carried on into an arrowhead: one stroke out along each barb.
const FULL = [...PTS.slice(0, 3), [23.2, 6.1]];
const TIP = FULL[3], BACK = Math.atan2(FULL[2][1] - TIP[1], FULL[2][0] - TIP[0]);
const barb = (a) => [TIP[0] + 3.4 * Math.cos(BACK + a), TIP[1] + 3.4 * Math.sin(BACK + a)];
const ARROW = [...FULL, barb(0.62), TIP, barb(-0.62)], ALEN = len(ARROW);
const path = (pts) => `M${pts.map((p) => p.map(f).join(' ')).join('L')}`;

export default defineIcon({
  name: 'whiteboard',
  zh: '白板',
  category: 'education',
  tags: ['board', 'teach', 'class', 'presentation', 'lesson', '黑板', '讲课'],
  // A whiteboard on an easel; on hover the line on it is drawn to the end and finished with an arrowhead.
  svg: (u) => {
    const frame = rr(4, 2.6, 23, 16.4, KR);
    return `<path d="M9.8 18L7.6 23.6M21.2 18L23.4 23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g><path d="${frame}" ${OL}/>
    <path d="${rr(6.2, 4.8, 18.6, 12, CR)}" fill="#fff"/>
    <path data-n="ln" d="M${PTS.map((p) => p.join(' ')).join('L')}" ${ACC} stroke-linejoin="round" stroke-dasharray="${f(LEN)} ${f(LEN)}"/>`;
  },
  target: (h) => ({ s: h ? ALEN : LEN * 0.62 }),
  draw(p, E) {
    // s is the length drawn so far; past the line's end the stroke goes on into the arrowhead.
    const [d, l] = p.s > LEN ? [path(ARROW), ALEN] : [`M${PTS.map((q) => q.join(' ')).join('L')}`, LEN];
    at(E.ln, { d, 'stroke-dasharray': `${f(l)} ${f(l)}`, 'stroke-dashoffset': f(l - p.s) });
  }
});
