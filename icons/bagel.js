import { defineIcon, f, OL, DEEPS, ellipse, at } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

// A sliced bagel seen from above at a tilt: lower half, cream, then the holed upper half.
const LOW = ellipse(15.5, 15.4, 11.4, 8.4);
const CREAM = ellipse(15.5, 12.8, 11.4, 8.4);
const TOP = ellipse(15.5, 9.8, 11.4, 8.4) + ellipse(15.5, 9.8, 6, 4.1);
const SEEDS = 'M6.6 10.4L7.4 8.8M19.8 3.3L21.6 3.9M12.4 16L14.2 16.4';

export default defineIcon({
  name: 'bagel',
  zh: '贝果',
  category: 'food',
  tags: ['breakfast', 'bread', 'bakery', 'sesame', 'cream cheese', '面包', '早餐'],
  variants: [],
  // A sliced sesame bagel with cream in the middle; the top half lifts open on hover.
  svg: (u) => `${solid(u, LOW)}<path d="${CREAM}" fill="#fff"/><path d="${CREAM}" ${OL}/>
    <g data-n="top">${light(u, TOP, 'fill-rule="evenodd"')}
      <path d="${SEEDS}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ y: h ? -2.6 : 0, a: h ? -7 : 0 }),
  draw(p, E) { at(E.top, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 9.8)` }); }
});
