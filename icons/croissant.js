import { defineIcon, f, OL, WHITES, at, scaleAt } from '../packages/core/src/kit.js';

// The crescent: the part of circle A outside circle B, its horns where they cross.
const A = [15.5, 20.6, 12.2], B = [15.5, 28.6, 13];
const HORN = (() => {
  const y = ((A[2] ** 2 - B[2] ** 2) - (A[1] ** 2 - B[1] ** 2)) / (2 * (B[1] - A[1]));
  return [Math.sqrt(A[2] ** 2 - (y - A[1]) ** 2), y];
})();
const BODY = `M${f(A[0] - HORN[0])} ${f(HORN[1])}A${A[2]} ${A[2]} 0 1 1 ${f(A[0] + HORN[0])} ${f(HORN[1])}A${B[2]} ${B[2]} 0 0 0 ${f(A[0] - HORN[0])} ${f(HORN[1])}Z`;
// Where the ray at angle t (degrees from north) leaves circle B, measured from A's centre.
const inner = (t) => {
  const c = Math.cos(t * Math.PI / 180);
  return (A[1] - B[1]) * c + Math.sqrt(((A[1] - B[1]) * c) ** 2 + B[2] ** 2 - (A[1] - B[1]) ** 2);
};
const point = (t, d) => `${f(A[0] + d * Math.sin(t * Math.PI / 180))} ${f(A[1] - d * Math.cos(t * Math.PI / 180))}`;
// A fold line across the crescent at angle t, inset from both edges.
const fold = (t) => `M${point(t, inner(t) + 0.9)}L${point(t, A[2] - 0.9)}`;
// The plump middle section between angles -t and t, standing slightly proud of the crescent.
const middle = (t, lift) => {
  const r = A[2] + lift;
  return `M${point(-t, r)}A${f(r)} ${f(r)} 0 0 1 ${point(t, r)}L${point(t, inner(t) - lift)}A${B[2]} ${B[2]} 0 0 0 ${point(-t, inner(t) - lift)}Z`;
};

export default defineIcon({
  name: 'croissant',
  zh: '牛角包',
  category: 'food',
  tags: ['bakery', 'bread', 'pastry', 'breakfast', 'french', '面包', '早餐'],
  variants: ['heart'],
  // A croissant with a plump middle section and scored layers; it puffs up on hover.
  svg: (u) => {
    const roll = middle(19, 0.7);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL} stroke-linejoin="round"/>
      <path d="${fold(-62) + fold(-40) + fold(40) + fold(62)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
      <g data-n="roll"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${roll}" fill="${u.upS}"/></g></g><path d="${roll}" ${OL} stroke-linejoin="round"/></g>
    </g>`;
  },
  target: (h) => ({ s: h ? 1.06 : 1, y: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.g, { transform: scaleAt(p.s, 15.5, 22) });
    at(E.roll, { transform: `translate(0 ${f(p.y)})` });
  }
});
