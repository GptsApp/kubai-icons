import { defineIcon, f, OL, sector, at } from '../packages/core/src/kit.js';

// The pie sits a little down and left so the slice pulled out up-right stays in bounds.
const CX = 14.7, CY = 13.3, RAD = 10, BASE = 20, SW = 100, MID = (BASE + SW / 2) * Math.PI / 180;

export default defineIcon({
  name: 'chart-pie',
  zh: '饼图',
  category: 'charts',
  tags: ['chart', 'pie', 'share', 'proportion', 'statistics', 'analytics', '占比'],
  variants: ['plus', 'x', 'search', 'cog'],
  // A pie chart; on hover one slice slides out of the pie.
  svg: (u) => {
    const rest = sector(BASE + SW, 360 - SW, RAD, CX, CY), slice = sector(BASE, SW, RAD, CX, CY);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${rest}" fill="${u.loS}"/></g></g><path d="${rest}" ${OL}/>
      <g data-n="sl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${slice}" fill="${u.upS}"/></g></g><path d="${slice}" ${OL}/></g>`;
  },
  target: (h) => ({ d: h ? 2.7 : 0 }),
  draw(p, E) { at(E.sl, { transform: `translate(${f(p.d * Math.sin(MID))} ${f(-p.d * Math.cos(MID))})` }); }
});
