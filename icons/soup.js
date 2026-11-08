import { defineIcon, f, OL, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { steam, reveal } from './_home-food.js';

const BOWL = 'M4.6 12.6H26.4C26.4 18.8 21.6 22.8 15.5 22.8C9.4 22.8 4.6 18.8 4.6 12.6Z';

export default defineIcon({
  name: 'soup',
  zh: '汤',
  category: 'food',
  tags: ['bowl', 'hot', 'meal', 'ramen', 'noodles', 'dinner', '汤碗', '面'],
  variants: ['heart', 'clock'],
  // A bowl of hot soup; on hover the spoon stirs it and steam rises.
  svg: (u) => {
    const soup = rr(5.6, 10.2, 19.8, 4.6, 2.3);
    const wisp = (n, x) => `<path data-n="${n}" d="${steam(x, 8.4, 2)}" pathLength="1" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`;
    return `${wisp('s1', 10.6)}${wisp('s2', 15.2)}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${soup}" fill="${u.loS}"/></g></g><path d="${soup}" ${OL}/>
      <path data-n="spoon" d="M18.6 12.2L24.2 3.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOWL}" fill="${u.upS}"/></g></g><path d="${BOWL}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.spoon, { transform: `rotate(${f(rattle(o, 12, 2))} 18 12.6)` });
    at(E.s1, reveal(clamp01(o / 0.8))); at(E.s2, reveal(clamp01((o - 0.2) / 0.8)));
  }
});
