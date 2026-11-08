import { defineIcon, f, OL, WHITES, rr, at } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

export default defineIcon({
  name: 'corn',
  zh: '玉米',
  category: 'food',
  tags: ['maize', 'cob', 'vegetable', 'harvest', 'farm', '粟米', '蔬菜'],
  variants: [],
  // An ear of corn in its husk, at a slant; the two husk leaves peel open on hover.
  svg: (u) => {
    const cob = rr(10.6, 0.6, 9.8, 20.6, 4.9);
    const l = leaf([15.9, 24.2], [8.2, 10.4], 3.4), r = leaf([15.1, 24.2], [22.8, 10.4], 3.4);
    return `<g transform="rotate(30 15.5 12.4)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cob}" fill="${u.loS}"/></g></g><path d="${cob}" ${OL}/>
      <path d="M13.9 4.6V15M17.1 4.6V15" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
      <g data-n="l"><g filter="${u.hi}"><path d="${l}" fill="${u.upS}"/></g><path d="${l}" ${OL}/></g>
      <g data-n="r"><g filter="${u.hi}"><path d="${r}" fill="${u.upS}"/></g><path d="${r}" ${OL}/></g></g>`;
  },
  target: (h) => ({ a: h ? 16 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `rotate(${f(-p.a)} 15.9 24.2)` });
    at(E.r, { transform: `rotate(${f(p.a)} 15.1 24.2)` });
  }
});
