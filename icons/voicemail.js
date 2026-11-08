import { defineIcon, KR, f, OL, DEEP, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

// A reel hub: a rounded triangle, so the turn shows.
const HUB = rp([0, 120, 240].map((d) => [2.4 * Math.sin(d * Math.PI / 180), -2.4 * Math.cos(d * Math.PI / 180)]), 0.9);
const REELS = [[10.6, 11.6], [20.4, 11.6]];

export default defineIcon({
  name: 'voicemail',
  zh: '语音信箱',
  category: 'communication',
  tags: ['voice message', 'tape', 'recording', 'answering machine', '留言'],
  variants: ['alert', 'check'],
  // A tape with two reels joined by the tape; on hover both reels wind on a turn and the tape
  // passes from the left reel onto the right.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      ${REELS.map(([x, y], i) => `<path data-n="r${i + 1}" d="${circ(x, y, 4.4)}" fill="#fff"/>`).join('')}<path data-n="tp" d="${rp(R(10.6, 13.6, 9.8, 2.4), 0)}" fill="#fff"/>
      <path data-n="h1" d="${HUB}" ${DEEP}/><path data-n="h2" d="${HUB}" ${DEEP}/>`;
  },
  target: (h) => ({ rot: h ? 120 : 0, w: h ? 1 : 0 }),
  draw(p, E) {
    const ra = 4.4 - 0.9 * p.w, rb = 4.4 + 0.6 * p.w, [[xl, y], [xr]] = REELS;
    at(E.r1, { d: circ(xl, y, ra) }); at(E.r2, { d: circ(xr, y, rb) });
    // The tape runs along the bottoms of both reels.
    at(E.tp, { d: rp([[xl, y + ra - 2.4], [xr, y + rb - 2.4], [xr, y + rb], [xl, y + ra]], 0) });
    REELS.forEach(([x, y], i) => at(E['h' + (i + 1)], { transform: `translate(${x} ${y}) rotate(${f(p.rot)})` }));
  }
});
