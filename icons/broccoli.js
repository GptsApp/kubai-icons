import { defineIcon, f, OL, rp, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'broccoli',
  zh: '西兰花',
  category: 'food',
  tags: ['vegetable', 'veggie', 'healthy', 'vegan', 'greens', '蔬菜', '花椰菜'],
  variants: [],
  // A head of broccoli on its stalk; the florets sway on the stalk on hover.
  svg: (u) => {
    // Florets: one path of same-winding circles, so its outline runs only round the outside.
    const top = [[9.2, 12.2, 4.6], [12.6, 7.4, 4.8], [18.4, 7.4, 4.8], [21.8, 12.2, 4.6], [15.5, 11.6, 5]].map(([x, y, r]) => circ(x, y, r)).join('') + 'M9.2 12V16.8H21.8V12Z';
    const stalk = rp([[11.4, 14.6], [19.6, 14.6], [18.2, 23.6], [12.8, 23.6]], [1.8, 1.8, 1.4, 1.4]);
    return `<g data-n="top"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${top}" fill="${u.loS}"/></g></g><path d="${top}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${stalk}" fill="${u.upS}"/></g></g><path d="${stalk}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.top, { transform: `rotate(${f(rattle(clamp01(p.o), 8, 2))} 15.5 16)` }); }
});
