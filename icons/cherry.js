import { defineIcon, f, OL, DEEPS, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const TOP = [16.4, 3];

export default defineIcon({
  name: 'cherry',
  zh: '樱桃',
  category: 'food',
  tags: ['fruit', 'berry', 'sweet', 'summer', 'snack', '水果'],
  variants: ['heart'],
  // A pair of cherries on joined stems; they swing on their stems on hover.
  svg: (u) => {
    const lf = leaf(TOP, [23.6, 4.4], 2.6);
    const one = (n, cx, cy, fill, a) => `<g data-n="${n}">
      <path d="M${cx} ${cy - 4}Q${f(cx + (TOP[0] - cx) * 0.2)} ${f(cy - 10)} ${TOP[0]} ${TOP[1]}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(cx, cy, 4.8)}" fill="${fill}"/></g></g><path d="${circ(cx, cy, 4.8)}" ${OL}/></g>`;
    return `<g filter="${u.hi}"><path d="${lf}" fill="${u.upS}"/></g><path d="${lf}" ${OL}/>
      ${one('a', 10.2, 17.6, u.loS)}${one('b', 20, 18.6, u.upS)}`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.a, { transform: `rotate(${f(rattle(o, 10, 2))} ${TOP[0]} ${TOP[1]})` });
    at(E.b, { transform: `rotate(${f(rattle(o, -8, 3))} ${TOP[0]} ${TOP[1]})` });
  }
});
