import { defineIcon, KR, CR, f, OL, ACC, LINE, DEEPS, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'fridge',
  zh: '冰箱',
  category: 'home',
  tags: ['refrigerator', 'kitchen', 'freezer', 'cold', 'appliance', '冷藏'],
  variants: ['plus', 'check', 'lock'],
  // A two-door fridge; its lower door swings open on its right hinge to the shelves inside.
  svg: (u) => {
    const body = rr(7.2, 1, 16.6, 23, KR), top = rp(R(7.2, 1, 16.6, 7.2), [KR, KR, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(9.4, 12.4, 12.2, 9.4, CR)}" fill="#fff"/>
      <path d="${lines(11.2, 15.6, [8.6])}" ${ACC}/><path d="${lines(11.2, 18.6, [5.6])}" ${LINE}/>
      <g filter="${u.hi}"><path d="${top}" fill="${u.upS}"/></g><path d="${top}" ${OL}/>
      <path d="M10.4 3.4V5.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path data-n="door" fill="${u.upS}"/></g><path data-n="doorO" ${OL}/>
      <path data-n="handle" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ s: h ? 0.3 : 1 }),
  draw(p, E) {
    const w = 16.6 * p.s, x = 23.8 - w, d = rp(R(x, 10.2, w, 13.8), [1.8, 1.8, KR, KR * p.s]);
    at(E.door, { d }); at(E.doorO, { d });
    const hx = x + Math.min(3.2, w * 0.4);
    at(E.handle, { d: `M${f(hx)} 12.6V16` });
  }
});
