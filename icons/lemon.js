import { defineIcon, f, OL, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const LEMON = 'M5 13.4Q5.6 12.4 6.8 12C7.8 7 11.4 5.2 15.5 5.2C19.6 5.2 23.2 7 24.2 12Q25.4 12.4 26 13.4Q25.4 14.4 24.2 14.8C23.2 19.8 19.6 21.6 15.5 21.6C11.4 21.6 7.8 19.8 6.8 14.8Q5.6 14.4 5 13.4Z';

export default defineIcon({
  name: 'lemon',
  zh: '柠檬',
  category: 'food',
  tags: ['citrus', 'fruit', 'sour', 'lime', 'vitamin', '水果'],
  variants: [],
  // A lemon lying at a slant with a leaf at its tip; it rolls to and fro on hover.
  svg: (u) => {
    const lf = leaf([24.2, 7.4], [27.2, 1.6], 2);
    return `<g data-n="g"><g filter="${u.hi}"><path d="${lf}" fill="${u.upS}"/></g><path d="${lf}" ${OL}/>
      <g transform="rotate(-24 15.5 13.4)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${LEMON}" fill="${u.loS}"/></g></g><path d="${LEMON}" ${OL}/>
      <path d="M9.4 12.2C9.8 10.2 11 8.8 12.8 8.2" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" stroke-opacity=".8"/></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 9, 2))} 15.5 21)` }); }
});
