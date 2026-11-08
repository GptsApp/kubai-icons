import { defineIcon, f, OL, DEEPS, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const APPLE = 'M15.5 8C13.2 6.4 6.6 6 6.4 12.8C6.2 18.2 10 23.2 12.8 23.2C14 23.2 14.6 22.6 15.5 22.6C16.4 22.6 17 23.2 18.2 23.2C21 23.2 24.8 18.2 24.6 12.8C24.4 6 17.8 6.4 15.5 8Z';

export default defineIcon({
  name: 'apple',
  zh: '苹果',
  category: 'food',
  tags: ['fruit', 'healthy', 'diet', 'snack', 'nutrition', '水果'],
  variants: ['heart', 'plus', 'check'],
  // An apple with a leaf on its stem; it rocks on hover and its leaf flutters.
  svg: (u) => {
    const lf = leaf([16.2, 5.6], [22.4, 2.2], 2.4);
    return `<g data-n="g">
      <path d="M15.5 8.2C15.5 6 15.9 4.4 17 2.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="leaf"><g filter="${u.hi}"><path d="${lf}" fill="${u.upS}"/></g><path d="${lf}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${APPLE}" fill="${u.loS}"/></g></g><path d="${APPLE}" ${OL}/>
      <path d="M9.6 12.6C9.8 11 10.6 10.2 11.8 9.8" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" stroke-opacity=".8"/>
    </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(rattle(o, 7, 2))} 15.5 23)` });
    at(E.leaf, { transform: `rotate(${f(rattle(o, -18, 3))} 16.2 5.6)` });
  }
});
