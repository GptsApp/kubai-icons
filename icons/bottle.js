import { defineIcon, f, OL, DEEP, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { flame } from './_home-food.js';

const BODY = 'M12.6 4.8H18.4V6.4Q22.2 7.8 22.2 11.2V21.8Q22.2 24 20 24H11Q8.8 24 8.8 21.8V11.2Q8.8 7.8 12.6 6.4Z';

export default defineIcon({
  name: 'bottle',
  zh: '水瓶',
  category: 'food',
  tags: ['water bottle', 'water', 'drink', 'hydration', 'beverage', 'plastic', '瓶装水', '喝水'],
  variants: ['plus', 'check'],
  // A water bottle with a label; its cap twists and lifts off on hover.
  svg: (u) => {
    const cap = rr(11.7, 1.6, 7.6, 3.8, 1.2), label = rp(R(8.8, 12, 13.4, 6.8), [0, 0, 0, 0]);
    return `<g data-n="cap"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${cap}" fill="${u.loS}"/></g></g><path d="${cap}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
      <g filter="${u.hi}"><path d="${label}" fill="${u.upS}"/></g><path d="${label}" ${OL}/>
      <path d="${flame(15.5, 17.8, 3.8, 5)}" ${DEEP}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.cap, { transform: `translate(0 ${f(-2.4 * o)}) rotate(${f(rattle(o, 12, 2))} 15.5 3.5)` });
  }
});
