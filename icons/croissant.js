import { defineIcon, f, OL, WHITES, ellipse, at, scaleAt } from '../packages/core/src/kit.js';

// The crescent: the part of circle A outside circle B, its horns where they cross.
const A = [15.5, 21, 12.6], B = [15.5, 29, 13.4];
const HORN = (() => {
  const y = ((A[2] ** 2 - B[2] ** 2) - (A[1] ** 2 - B[1] ** 2)) / (2 * (B[1] - A[1]));
  return [Math.sqrt(A[2] ** 2 - (y - A[1]) ** 2), y];
})();
const BODY = `M${f(A[0] - HORN[0])} ${f(HORN[1])}A${A[2]} ${A[2]} 0 1 1 ${f(A[0] + HORN[0])} ${f(HORN[1])}A${B[2]} ${B[2]} 0 0 0 ${f(A[0] - HORN[0])} ${f(HORN[1])}Z`;
// A fold line across the crescent at angle t (degrees from north), inset from both edges.
const fold = (t) => {
  const s = Math.sin(t * Math.PI / 180), c = Math.cos(t * Math.PI / 180);
  const dIn = (A[1] - B[1]) * c + Math.sqrt(((A[1] - B[1]) * c) ** 2 + B[2] ** 2 - (A[1] - B[1]) ** 2);
  const p = (d) => `${f(A[0] + d * s)} ${f(A[1] - d * c)}`;
  return `M${p(dIn + 0.9)}L${p(A[2] - 0.9)}`;
};

export default defineIcon({
  name: 'croissant',
  zh: '牛角包',
  category: 'food',
  tags: ['bakery', 'bread', 'pastry', 'breakfast', 'french', '面包', '早餐'],
  variants: ['heart'],
  // A croissant with a plump middle roll; it puffs up on hover as if fresh from the oven.
  svg: (u) => {
    const roll = ellipse(15.5, 12.4, 4.4, 5.8);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL} stroke-linejoin="round"/>
      <path d="${fold(-52) + fold(52)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
      <g data-n="roll"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${roll}" fill="${u.upS}"/></g></g><path d="${roll}" ${OL}/></g>
    </g>`;
  },
  target: (h) => ({ s: h ? 1.06 : 1, y: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.g, { transform: scaleAt(p.s, 15.5, 22) });
    at(E.roll, { transform: `translate(0 ${f(p.y)})` });
  }
});
