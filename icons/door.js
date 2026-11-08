import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'door',
  zh: '门',
  category: 'home',
  tags: ['entrance', 'exit', 'room', 'open', 'enter', '房门'],
  variants: ['lock', 'check', 'x'],
  // A door in its frame; it swings open on its left hinge to the bright outside on hover.
  svg: (u) => {
    const frame = rr(7, 1, 17, 23, KR), way = rp(R(10, 4, 11, 20), [1.6, 1.6, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g><path d="${frame}" ${OL}/>
      <path d="${way}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="leaf" fill="${u.upS}"/></g><path data-n="leafO" ${OL}/>
      <circle data-n="knob" cy="12.6" r="1.3" ${DEEP}/>`;
  },
  target: (h) => ({ s: h ? 0.45 : 1 }),
  draw(p, E) {
    const w = 11 * p.s, d = rp(R(10, 4, w, 20), [1.6, 1.6, 0, 0]);
    at(E.leaf, { d }); at(E.leafO, { d });
    at(E.knob, { cx: f(10 + w * (0.4 + 0.4 * p.s)) });
  }
});
