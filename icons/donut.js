import { defineIcon, f, OL, DEEPS, circ, at } from '../packages/core/src/kit.js';

const C = [15.5, 12.5];
// Icing with a wavy outer edge round the hole.
const ICING = (() => {
  let d = '';
  for (let i = 0; i < 70; i++) {
    const t = i / 70 * Math.PI * 2, r = 8.2 + 0.6 * Math.sin(7 * t);
    d += (i ? 'L' : 'M') + f(C[0] + r * Math.sin(t)) + ' ' + f(C[1] - r * Math.cos(t));
  }
  return d + 'Z' + circ(C[0], C[1], 3.4);
})();
// Sprinkles as [angle, distance, tilt].
const SPRINKLES = [[35, 6, 70], [155, 6, 10], [275, 6, 130]];

export default defineIcon({
  name: 'donut',
  zh: '甜甜圈',
  category: 'food',
  tags: ['doughnut', 'dessert', 'sweet', 'bakery', 'sprinkles', 'snack', '多拿滋'],
  variants: ['heart'],
  // A glazed donut with sprinkles; it turns round on hover.
  svg: (u) => {
    const ring = circ(C[0], C[1], 11) + circ(C[0], C[1], 3.4);
    const sp = SPRINKLES.map(([a, r, t]) => {
      const x = C[0] + r * Math.sin(a * Math.PI / 180), y = C[1] - r * Math.cos(a * Math.PI / 180);
      return `<path d="M${f(x - 1.2)} ${f(y)}H${f(x + 1.2)}" transform="rotate(${t} ${f(x)} ${f(y)})"/>`;
    }).join('');
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${ring}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${ring}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.hi}"><g data-n="a"><path d="${ICING}" fill-rule="evenodd" fill="${u.upS}"/></g></g>
      <g data-n="b"><path d="${ICING}" fill-rule="evenodd" ${OL}/>
      <g fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}>${sp}</g></g>`;
  },
  target: (h) => ({ a: h ? 72 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} ${C[0]} ${C[1]})`;
    at(E.a, { transform: t }); at(E.b, { transform: t });
  }
});
