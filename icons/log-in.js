import { defineIcon, KR, f, OL, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'log-in',
  zh: '登录',
  category: 'arrows',
  tags: ['sign in', 'login', 'enter', 'door', 'access', '进入'],
  // A door with an arrow beside it pointing in. On hover the door swings open on its
  // right hinge and the arrow heads in towards it.
  svg: (u) => {
    const frame = rr(14.8, 1, 12.2, 23, KR), way = rp(R(17.8, 4, 6.2, 20), [1.6, 1.6, 0, 0]);
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g>
    <path d="${frame}" ${OL}/>
    <path d="${way}" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="leaf" fill="${u.upS}"/></g>
    <path data-n="leafO" ${OL}/>
    <circle data-n="knob" cy="14" r="1.2" ${DEEP}/>
    <g data-n="arrow"><path d="M4.4 12.5H7.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path d="${rp([[7, 9.9], [10.4, 12.5], [7, 15.1]], 0.5)}" ${DEEP}/></g>`;
  },
  target: (h) => ({ s: h ? 0.5 : 1, x: h ? 1.4 : 0 }),
  draw(p, E) {
    const w = 6.2 * p.s, d = rp(R(24 - w, 4, w, 20), [1.6, 1.6, 0, 0]);
    at(E.leaf, { d }); at(E.leafO, { d });
    // The knob keeps to the free edge and never leaves the narrowing leaf.
    at(E.knob, { cx: f(24 - w * (0.29 + 0.42 * p.s)) });
    at(E.arrow, { transform: `translate(${f(p.x)} 0)` });
  }
});
