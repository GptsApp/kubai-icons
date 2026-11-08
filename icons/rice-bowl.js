import { defineIcon, f, OL, DEEPS, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { steam, reveal } from './_home-food.js';

const BOWL = 'M4.6 14.4H26.4C26.4 19.6 22 22.6 15.5 22.6C9 22.6 4.6 19.6 4.6 14.4Z';
// The heap of rice: same-winding circles plus a counter-clockwise block, outlined only outside.
const RICE = [[9.2, 12.8, 3.6], [12.6, 9.2, 3.8], [18.4, 9.2, 3.8], [21.8, 12.8, 3.6], [15.5, 10.4, 4.2]].map(([x, y, r]) => circ(x, y, r)).join('') + 'M9.2 12V16H21.8V12Z';

export default defineIcon({
  name: 'rice-bowl',
  zh: '米饭',
  category: 'food',
  tags: ['rice', 'bowl', 'meal', 'lunch', 'asian', 'dinner', '饭碗', '盖饭'],
  variants: ['heart', 'clock'],
  // A bowl heaped with rice; steam rises from it on hover.
  svg: (u) => {
    const foot = rr(11, 21, 9, 2.8, 1.2);
    const wisp = (n, x) => `<path data-n="${n}" d="${steam(x, 4.4, 2)}" pathLength="1" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`;
    return `${wisp('s1', 12.4)}${wisp('s2', 18.4)}
      <path d="${RICE}" fill="#fff"/><path d="${RICE}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${foot}" fill="${u.upS}"/></g></g><path d="${foot}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOWL}" fill="${u.loS}"/></g></g><path d="${BOWL}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.s1, reveal(clamp01(o / 0.8))); at(E.s2, reveal(clamp01((o - 0.2) / 0.8)));
  }
});
