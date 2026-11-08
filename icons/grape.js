import { defineIcon, f, OL, DEEPS, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

// Berries row by row from the back: [cx, cy, front].
const BERRIES = [[8.9, 8.6, 0], [15.5, 8.6, 0], [22.1, 8.6, 0], [12.2, 14.3, 1], [18.8, 14.3, 1], [15.5, 20, 0]];

export default defineIcon({
  name: 'grape',
  zh: '葡萄',
  category: 'food',
  tags: ['grapes', 'fruit', 'bunch', 'vine', 'wine', '水果'],
  variants: [],
  // A bunch of grapes on a stem with a leaf; the bunch swings from its stem on hover.
  svg: (u) => {
    const lf = leaf([16.2, 2.6], [23.4, 1.6], 2.4);
    const b = BERRIES.map(([x, y, k]) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(x, y, 3.5)}" fill="${k ? u.upS : u.loS}"/></g></g><path d="${circ(x, y, 3.5)}" ${OL}/>`).join('');
    return `<g data-n="g"><path d="M15.5 5.6Q15.4 3 16.8 0.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path d="${lf}" fill="${u.upS}"/></g><path d="${lf}" ${OL}/>${b}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 9, 2))} 16 2)` }); }
});
