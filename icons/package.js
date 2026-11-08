import { defineIcon, KR, OL, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'package',
  zh: '包裹',
  category: 'commerce',
  tags: ['box', 'parcel', 'delivery', 'shipping'],
  variants: ['plus', 'minus', 'check', 'x', 'search', 'clock', 'up', 'down', 'right', 'alert', 'lock', 'heart', 'sync'],
  // A parcel whose two top flaps fold open on hover.
  svg: (u) => {
    const box = rr(5.2, 8.6, 20.6, 14.2, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.lo(14.2)}"/></g></g><path d="${box}" ${OL}/>
      <path d="${rr(14.2, 8.6, 2.6, 4.6, 0.6)}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="fl" fill="${u.upS}"/></g><path data-n="flO" ${OL}/>
      <g filter="${u.hi}"><path data-n="fr" fill="${u.upS}"/></g><path data-n="frO" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const l = rp([[5.2, 8.6], [15.4, 8.6], [15.4 - 2.6 * o, 6.2 - 2.8 * o], [5.2 - 2.8 * o, 6.2 - 1.6 * o]], [0.6, 0.6, 1, 1]);
    const r = rp([[15.6, 8.6], [25.8, 8.6], [25.8 + 2.8 * o, 6.2 - 1.6 * o], [15.6 + 2.6 * o, 6.2 - 2.8 * o]], [0.6, 0.6, 1, 1]);
    at(E.fl, { d: l }); at(E.flO, { d: l }); at(E.fr, { d: r }); at(E.frO, { d: r });
  }
});
