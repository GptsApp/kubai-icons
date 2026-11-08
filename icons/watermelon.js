import { defineIcon, f, OL, DEEP, sector, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const CX = 15.5, CY = 1;
const SEEDS = [[15.5, 12.4], [11.8, 17.2], [19.2, 17.2]];

export default defineIcon({
  name: 'watermelon',
  zh: '西瓜',
  category: 'food',
  tags: ['melon', 'fruit', 'slice', 'summer', 'juicy', '水果'],
  variants: [],
  // A wedge of watermelon standing on its rind; it rocks on its curved rind on hover.
  svg: (u) => {
    const rind = sector(150, 60, 22, CX, CY), flesh = sector(150, 60, 19.2, CX, CY);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${rind}" fill="${u.loS}"/></g></g><path d="${rind}" ${OL} stroke-linejoin="round"/>
      <g filter="${u.hi}"><path d="${flesh}" fill="${u.upS}"/></g>
      ${SEEDS.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="1.6" ${DEEP}/>`).join('')}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 2))} 15.5 23)` }); }
});
