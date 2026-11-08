import { defineIcon, f, OL, DEEPS, rp, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { steam, reveal } from './_home-food.js';

export default defineIcon({
  name: 'coffee',
  zh: '咖啡',
  category: 'food',
  tags: ['cup', 'cafe', 'drink', 'hot', 'break', 'espresso', '咖啡馆'],
  variants: ['heart', 'star', 'plus', 'check', 'clock'],
  // A coffee cup on its saucer; steam rises from it on hover.
  svg: (u) => {
    const cup = rp([[6.6, 8.4], [21.8, 8.4], [20.4, 19.6], [8, 19.6]], [1, 1, 3.4, 3.4]);
    const handle = circ(21.6, 12.6, 3.8) + circ(21.6, 12.6, 1.7), saucer = rr(4.4, 19.4, 19.6, 3.6, 1.8);
    const wisp = (n, x) => `<path data-n="${n}" d="${steam(x, 6, 2)}" pathLength="1" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`;
    return `${wisp('s1', 11.8)}${wisp('s2', 16.6)}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cup}" fill="${u.loS}"/></g></g><path d="${cup}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${saucer}" fill="${u.upS}"/></g></g><path d="${saucer}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.s1, reveal(clamp01(o / 0.8)));
    at(E.s2, reveal(clamp01((o - 0.2) / 0.8)));
  }
});
