import { defineIcon, f, OL, WHITES, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const ROOT = 'M11.6 9Q11.6 6.6 14 6.6H17Q19.4 6.6 19.4 9C19.4 13.6 17 22 15.5 25C14 22 11.6 13.6 11.6 9Z';

export default defineIcon({
  name: 'carrot',
  zh: '胡萝卜',
  category: 'food',
  tags: ['vegetable', 'veggie', 'healthy', 'vegan', 'garden', '蔬菜'],
  variants: ['plus', 'heart'],
  // A carrot lying at a slant; its leafy top rustles on hover.
  svg: (u) => {
    const lv = leaf([15.5, 7.6], [15.5, 0.2], 2.2) + leaf([14.8, 7.6], [10.2, 1.4], 2) + leaf([16.2, 7.6], [20.8, 1.4], 2);
    return `<g transform="rotate(38 15.5 12.6)">
      <g data-n="lv"><g filter="${u.hi}"><path d="${lv}" fill="${u.upS}"/></g><path d="${lv}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${ROOT}" fill="${u.loS}"/></g></g><path d="${ROOT}" ${OL}/>
      <path d="M12.4 11.2H14.8M16 15.6H17.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.lv, { transform: `rotate(${f(rattle(clamp01(p.o), 14, 3))} 15.5 7.2)` }); }
});
