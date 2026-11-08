import { defineIcon, KR, f, OL, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';
import { flame } from './_home-food.js';

export default defineIcon({
  name: 'milk',
  zh: '牛奶',
  category: 'food',
  tags: ['carton', 'dairy', 'drink', 'breakfast', 'grocery', '奶'],
  variants: ['plus', 'check'],
  // A gable-top milk carton that tips over to pour on hover.
  svg: (u) => {
    const body = rp(R(8.6, 9.6, 13.8, 13.8), [0.6, 0.6, KR, KR]);
    const gable = rp([[8.6, 10.6], [11.6, 5], [19.4, 5], [22.4, 10.6]], [0.6, 1, 1, 0.6]), fin = rr(11.2, 2.4, 8.6, 3.6, 0.8);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${fin}" fill="${u.loS}"/></g></g><path d="${fin}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.lo(13.8)}"/></g></g><path d="${body}" ${OL}/>
      <path d="${flame(15.5, 19.2, 4.6, 6.4)}" ${WHITE}/>
      <g filter="${u.hi}"><path d="${gable}" fill="${u.upS}"/></g><path d="${gable}" ${OL}/>
    </g>`;
  },
  target: (h) => ({ a: h ? -14 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(p.a)} 8.6 23.4)` }); }
});
