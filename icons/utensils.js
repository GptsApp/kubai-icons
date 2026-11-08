import { defineIcon, f, OL, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'utensils',
  zh: '餐具',
  category: 'food',
  tags: ['fork', 'knife', 'restaurant', 'dining', 'meal', 'eat', '餐厅', '吃饭'],
  variants: ['plus', 'check', 'clock', 'star', 'heart'],
  // A fork beside a knife; the knife saws up and down on hover.
  svg: (u) => {
    const fork = rp([[7.2, 1.4], [9.2, 1.4], [9.7, 6.6], [10.2, 1.4], [12, 1.4], [12.5, 6.6], [13, 1.4], [15, 1.4], [15, 8.2], [12.4, 11], [12.4, 23.6], [9.8, 23.6], [9.8, 11], [7.2, 8.2]],
      [0.8, 0.8, 0, 0.8, 0.8, 0, 0.8, 0.8, 1.6, 0.6, 1.3, 1.3, 0.6, 1.6]);
    const blade = 'M19 13V3.6Q19 1.4 21 1.4Q23.8 1.8 23.8 7V12.4Q23.8 13 23.2 13Z', grip = rr(19, 12, 2.9, 11.6, 1.45);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${fork}" fill="${u.loS}"/></g></g><path d="${fork}" ${OL}/>
      <g data-n="knife">
        <g filter="${u.sh}"><g filter="${u.hi}"><path d="${blade}" fill="${u.upS}"/></g></g><path d="${blade}" ${OL}/>
        <g filter="${u.hi}"><path d="${grip}" fill="${u.loS}"/></g><path d="${grip}" ${OL}/>
      </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.knife, { transform: `translate(0 ${f(rattle(clamp01(p.o), 2, 3))})` }); }
});
