import { defineIcon, f, OL, WHITES, rr, circ, poly, at } from '../packages/core/src/kit.js';

const C = [15.5, 9.8];
// A spiral from the centre out, one and three quarter turns.
const SWIRL = poly(Array.from({ length: 64 }, (_, i) => {
  const t = i / 63 * Math.PI * 2 * 1.75, r = 0.6 + 2.9 * t / (Math.PI * 2);
  return [C[0] + r * Math.cos(t), C[1] + r * Math.sin(t)];
}));

export default defineIcon({
  name: 'lollipop',
  zh: '棒棒糖',
  category: 'food',
  tags: ['candy', 'sweet', 'sucker', 'treat', 'kids', '糖果'],
  variants: [],
  // A swirled lollipop on a stick; the swirl spins round on hover.
  svg: (u) => {
    const stick = rr(14.3, 16, 2.4, 8.2, 1.2), pop = circ(C[0], C[1], 8.6);
    return `<g filter="${u.hi}"><path d="${stick}" fill="${u.upS}"/></g><path d="${stick}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${pop}" fill="${u.loS}"/></g></g><path d="${pop}" ${OL}/>
      <path data-n="sw" d="${SWIRL}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`;
  },
  target: (h) => ({ a: h ? 270 : 0 }),
  draw(p, E) { at(E.sw, { transform: `rotate(${f(p.a)} ${C[0]} ${C[1]})` }); }
});
