import { defineIcon, f, OL, rp, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'ice-cream',
  zh: '冰淇淋',
  category: 'food',
  tags: ['cone', 'dessert', 'summer', 'sweet', 'gelato', '甜筒', '雪糕'],
  variants: ['heart'],
  // A scoop on a waffle cone; on hover the scoop slumps and spreads as it melts and a drip
  // runs down past the cone.
  svg: (u) => {
    const cone = rp([[9.4, 12.2], [21.6, 12.2], [15.5, 24.4]], [1, 1, 1.6]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${cone}" fill="${u.loS}"/></g></g><path d="${cone}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="sc" fill="${u.upS}"/></g></g><path data-n="scO" ${OL}/>`;
  },
  target: (h) => ({ d: h ? 7.4 : 1.6, m: h ? 1 : 0 }),
  draw(p, E) {
    // m flattens the dome, widens it and lets its lower edge sag over the cone.
    const m = p.m, l = f(8.7 - 0.5 * m), r = f(22.3 + 0.5 * m), top = f(9 + 0.6 * m), side = f(11 + 0.5 * m);
    const b = 12.8 + 0.4 * m, low = f(b + p.d - 1.3), by = f(b);
    const d = `M${l} ${top}A${f(6.8 + 0.5 * m)} ${f(6.8 - 1.4 * m)} 0 0 1 ${r} ${top}V${side}Q${r} ${by} ${f(r - 1.8)} ${by}H14.3V${low}A1.3 1.3 0 0 1 11.7 ${low}V${by}H${f(l + 1.8)}Q${l} ${by} ${l} ${side}Z`;
    at(E.sc, { d }); at(E.scO, { d });
  }
});
