import { defineIcon, KR, f, OL, DEEP, DEEPS, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';

// The card's parts, lowered by d.
const body = (d) => rp([[6.8, 1 + d], [19, 1 + d], [24.2, 6.2 + d], [24.2, 24 + d], [6.8, 24 + d]], [KR, 1.2, 1.2, KR, KR]);
const label = (d) => rp(R(6.8, 11.4 + d, 17.4, 12.6), [1.8, 1.8, KR, KR]);
const contacts = (d) => rr(9.4, 3.4 + d, 2.4, 4.4, 0.6) + rr(12.8, 3.4 + d, 2.4, 4.4, 0.6) + rr(16.2, 3.4 + d, 2.4, 4.4, 0.6);

export default defineIcon({
  name: 'sd-card',
  zh: '存储卡',
  category: 'devices',
  tags: ['sd', 'memory card', 'storage', 'camera card', 'TF 卡'],
  variants: ['plus', 'check', 'x', 'alert', 'lock', 'sync'],
  // A memory card with its clipped corner and contacts; on hover it slides down into its slot and
  // the lock switch slides down.
  svg: (u) => {
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="bd" d="${body(0)}" fill="${u.loS}"/></g></g><path data-n="bdO" d="${body(0)}" ${OL}/>
      <path data-n="ct" d="${contacts(0)}" ${WHITE}/>
      <g filter="${u.hi}"><path data-n="lb" d="${label(0)}" fill="${u.upS}"/></g><path data-n="lbO" d="${label(0)}" ${OL}/>
      <path data-n="ln" d="M14 15.8H20.6" class="ln" ${DEEPS} stroke-opacity=".55"/>
      <path data-n="lock" ${DEEP}/>`;
  },
  target: (h) => ({ y: h ? 18.4 : 13.6, d: h ? 2 : 0 }),
  draw(p, E) {
    const b = body(p.d), l = label(p.d);
    at(E.bd, { d: b }); at(E.bdO, { d: b }); at(E.lb, { d: l }); at(E.lbO, { d: l });
    at(E.ct, { d: contacts(p.d) });
    at(E.ln, { d: `M14 ${f(15.8 + p.d)}H20.6` });
    at(E.lock, { d: rr(9.2, p.y + p.d, 2.4, 4.6, 1.2) });
  }
});
