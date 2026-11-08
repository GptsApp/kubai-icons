import { defineIcon, KR, f, OL, WHITE, R, rp, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const HOLES = [[10.2, 17.8, 1.8], [16.8, 15.8, 1.4], [20.8, 19.4, 1.3]];

export default defineIcon({
  name: 'cheese',
  zh: '奶酪',
  category: 'food',
  tags: ['wedge', 'dairy', 'swiss', 'snack', 'cheddar', '芝士', '干酪'],
  variants: [],
  // A wedge of holey cheese; it rocks on its base on hover.
  svg: (u) => {
    const top = rp([[4.6, 12.6], [26.4, 4], [26.4, 12.6]], [0.8, KR, 0]);
    const side = rp(R(4.6, 12.6, 21.8, 10.4), [0.8, 0, KR, KR]);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${top}" fill="${u.upS}"/></g></g><path d="${top}" ${OL} stroke-linejoin="round"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${side}" fill="${u.loS}"/></g></g><path d="${side}" ${OL}/>
      ${HOLES.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${WHITE}/>`).join('')}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), -6, 2))} 26.4 23)` }); }
});
