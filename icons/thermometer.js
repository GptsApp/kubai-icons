import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';

const GLASS = 'M12.3 4.4A3.2 3.2 0 0 1 18.7 4.4V15.822A4.8 4.8 0 1 1 12.3 15.822Z';

export default defineIcon({
  name: 'thermometer',
  zh: '温度计',
  category: 'weather',
  tags: ['temperature', 'heat', 'climate', 'fever', '温度'],
  variants: ['plus', 'minus', 'alert'],
  badgeAt: [23.2, 15.6],
  // A glass thermometer; on hover the mercury swells in the bulb and rises right up the tube.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${GLASS}" fill="${u.upS}"/></g></g><path d="${GLASS}" ${OL}/>
    <path data-n="hg" fill="${u.pure('#4389FF')}"/>`,
  target: (h) => ({ lvl: h ? 2.8 : 10.4, r: h ? 3.4 : 2.6 }),
  draw(p, E) {
    // The bulb's mercury, drawn clockwise so it merges with the column.
    const r = f(p.r), bulb = `M${f(15.5 - p.r)} 19.4A${r} ${r} 0 1 1 ${f(15.5 + p.r)} 19.4A${r} ${r} 0 1 1 ${f(15.5 - p.r)} 19.4Z`;
    at(E.hg, { d: rr(14.3, p.lvl, 2.4, 19.4 - p.lvl, 1.2) + bulb });
  }
});
