import { defineIcon, f, OL, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const MEAT = 'M15.5 0.8C20.2 0.8 22.6 4.4 22.6 8.4C22.6 12.4 19.6 14.6 17.4 17H13.6C11.4 14.6 8.4 12.4 8.4 8.4C8.4 4.4 10.8 0.8 15.5 0.8Z';
const BONE = 'M14 15H17V20.6A2.3 2.3 0 1 1 15.5 24.2A2.3 2.3 0 1 1 14 20.6Z';

export default defineIcon({
  name: 'drumstick',
  zh: '鸡腿',
  category: 'food',
  tags: ['chicken', 'meat', 'leg', 'fried chicken', 'bbq', 'protein', '炸鸡'],
  variants: [],
  // A chicken drumstick held by its bone; it waggles on hover.
  svg: (u) => `<g data-n="g"><g transform="rotate(42 15.5 12.5)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BONE}" fill="${u.upS}"/></g></g><path d="${BONE}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${MEAT}" fill="${u.loS}"/></g></g><path d="${MEAT}" ${OL}/>
      <path d="M11.2 7.8C11.6 5.8 12.6 4.6 14 4" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" stroke-opacity=".8"/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 2))} 9 21)` }); }
});
