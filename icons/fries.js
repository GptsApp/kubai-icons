import { defineIcon, f, OL, rp, R, at } from '../packages/core/src/kit.js';

const BOX = 'M6.2 10.8Q15.5 15 24.8 10.8L22.8 21.2Q22.4 23.4 20.2 23.4H10.8Q8.6 23.4 8.2 21.2Z';
// Fries as [x, top, tilt, rise on hover].
const FRIES = [[9.4, 6, -12, 1.2], [12.5, 3.2, -6, 2.2], [15.5, 2, 0, 1.4], [18.5, 3.6, 6, 2.4], [21.6, 6.2, 12, 1.4]];

export default defineIcon({
  name: 'fries',
  zh: '薯条',
  category: 'food',
  tags: ['french fries', 'chips', 'fast food', 'snack', 'takeout', '炸薯条'],
  variants: ['plus'],
  // A carton of fries; the fries jostle up out of the carton on hover.
  svg: (u) => {
    const fries = FRIES.map(([x, t, a], i) => {
      const d = rp(R(x - 1.4, t, 2.8, 20 - t), [1, 1, 0, 0]);
      return `<g data-n="f${i}"><g transform="rotate(${a} ${x} 22)"><g filter="${u.hi}"><path d="${d}" fill="${u.upS}"/></g><path d="${d}" ${OL}/></g></g>`;
    }).join('');
    return `${fries}<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOX}" fill="${u.loS}"/></g></g><path d="${BOX}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { FRIES.forEach((fr, i) => at(E['f' + i], { transform: `translate(0 ${f(-fr[3] * p.o)})` })); }
});
