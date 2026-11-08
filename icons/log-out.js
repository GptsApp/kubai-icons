import { defineIcon, KR, f, OL, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'log-out',
  zh: '退出',
  category: 'arrows',
  tags: ['sign out', 'exit', 'leave', 'door'],
  // A door with an arrow beside it. On hover the door swings open on its left hinge to
  // the bright outside and the arrow heads on out.
  svg: (u) => {
    const frame = rr(4, 1, 12.2, 23, KR), way = rp(R(7, 4, 6.2, 20), [1.6, 1.6, 0, 0]);
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g>
    <path d="${frame}" ${OL}/>
    <path d="${way}" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="leaf" fill="${u.upS}"/></g>
    <path data-n="leafO" ${OL}/>
    <circle data-n="knob" cy="14" r="1.2" ${DEEP}/>
    <g data-n="arrow"><path d="M20.3 12.5H24" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path d="${rp([[23.6, 9.9], [27, 12.5], [23.6, 15.1]], 0.5)}" ${DEEP}/></g>`;
  },
  target: (h) => ({ s: h ? 0.5 : 1, x: h ? 1.4 : 0 }),
  draw(p, E) {
    const w = 6.2 * p.s, d = rp(R(7, 4, w, 20), [1.6, 1.6, 0, 0]);
    at(E.leaf, { d }); at(E.leafO, { d });
    // The knob keeps to the free edge and never leaves the narrowing leaf.
    at(E.knob, { cx: f(7 + w * (0.29 + 0.42 * p.s)) });
    at(E.arrow, { transform: `translate(${f(p.x)} 0)` });
  }
});
