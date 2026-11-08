import { defineIcon, KR, WHITE, ACC, rp, at, scaleAt } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

const TOP = 'M6.6 14.8C4 14.2 3.6 9.6 6.6 8.4C7.4 4 11.4 1.4 15.5 1.4C19.6 1.4 23.6 4 24.4 8.4C27.4 9.6 27 14.2 24.4 14.8Z';
const CHIPS = [[10.6, 9.8], [16, 6.4], [20.6, 10.6]];

export default defineIcon({
  name: 'muffin',
  zh: '玛芬',
  category: 'food',
  tags: ['cupcake', 'bakery', 'dessert', 'breakfast', 'chocolate chip', '马芬', '纸杯蛋糕'],
  variants: ['heart'],
  // A chocolate-chip muffin in a pleated wrapper; on hover its top rises as if baking.
  svg: (u) => {
    const wrap = rp([[7.8, 13], [23.2, 13], [21.2, 24], [9.8, 24]], [0.8, 0.8, KR, KR]);
    return `${light(u, wrap)}<path d="M12 17V21M15.5 17V21M19 17V21" fill="none" stroke-linecap="round" ${ACC}/>
      <g data-n="top">${solid(u, TOP)}${CHIPS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" ${WHITE}/>`).join('')}</g>`;
  },
  target: (h) => ({ s: h ? 1.12 : 1 }),
  draw(p, E) { at(E.top, { transform: scaleAt(p.s, 15.5, 14.8) }); }
});
