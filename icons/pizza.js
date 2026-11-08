import { defineIcon, f, OL, DEEP, sector, at } from '../packages/core/src/kit.js';

const RO = 9.8, RI = 7.6;
// Pepperoni as polar [angle, distance] from the centre.
const ON_PIE = [[200, 4.2], [290, 4.6], [140, 5]], ON_SLICE = [[45, 4.8]];

export default defineIcon({
  name: 'pizza',
  zh: '披萨',
  category: 'food',
  tags: ['food', 'slice', 'pepperoni', 'italian', 'takeout', 'delivery', '比萨'],
  variants: ['heart', 'plus', 'star'],
  // A whole pizza; one slice pulls away from the pie on hover.
  svg: (u) => {
    const dots = (list) => list.map(([a, r]) => `<circle cx="${f(15.5 + r * Math.sin(a * Math.PI / 180))}" cy="${f(12.5 - r * Math.cos(a * Math.PI / 180))}" r="1.5" ${DEEP}/>`).join('');
    const part = (n, a0, sw, list) => `<g data-n="${n}">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${sector(a0, sw, RO)}" fill="${u.loS}"/></g></g><path d="${sector(a0, sw, RO)}" ${OL}/>
      <g filter="${u.hi}"><path d="${sector(a0, sw, RI)}" fill="${u.upS}"/></g>${dots(list)}</g>`;
    return part('pie', 90, 270, ON_PIE) + part('slice', 0, 90, ON_SLICE);
  },
  target: (h) => ({ d: h ? [-1.4, 3.6] : [0, 0] }),
  draw(p, E) {
    // Both pieces move along the slice's bisector, the pie back and the slice out.
    const k = Math.SQRT1_2;
    at(E.pie, { transform: `translate(${f(p.d[0] * k)} ${f(-p.d[0] * k)})` });
    at(E.slice, { transform: `translate(${f(p.d[1] * k)} ${f(-p.d[1] * k)})` });
  }
});
