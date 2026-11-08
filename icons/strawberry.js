import { defineIcon, f, OL, WHITE, DEEPS, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const BERRY = 'M15.5 23.8C10.4 21.8 5.4 15.8 5.4 11.4C5.4 7.8 8.2 6.4 10.8 6.4C12.8 6.4 14 7.2 15.5 7.2C17 7.2 18.2 6.4 20.2 6.4C22.8 6.4 25.6 7.8 25.6 11.4C25.6 15.8 20.6 21.8 15.5 23.8Z';
const SEEDS = [[11, 11.8], [15.5, 12.6], [20, 11.8], [13.2, 16.8], [17.8, 16.8]];

export default defineIcon({
  name: 'strawberry',
  zh: '草莓',
  category: 'food',
  tags: ['berry', 'fruit', 'sweet', 'summer', 'dessert', '水果'],
  variants: ['heart'],
  // A strawberry with a leafy cap; it swings from its stem on hover.
  svg: (u) => {
    const cap = leaf([15.5, 7.4], [8.6, 8.4], 2) + leaf([15.5, 7.4], [22.4, 8.4], 2) + leaf([15.5, 7.6], [15.5, 2.2], 2);
    return `<g data-n="g">
      <path d="M15.5 4L16.6 0.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BERRY}" fill="${u.loS}"/></g></g><path d="${BERRY}" ${OL}/>
      ${SEEDS.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="1.4" ${WHITE}/>`).join('')}
      <g filter="${u.hi}"><path d="${cap}" fill="${u.upS}"/></g><path d="${cap}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 2))} 15.5 2)` }); }
});
