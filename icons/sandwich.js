import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';

const TOP = 'M4.4 13.4C4.4 7 9.6 4.6 15.5 4.6C21.4 4.6 26.6 7 26.6 13.4V13.6Q26.6 15 25.2 15H5.8Q4.4 15 4.4 13.6Z';
// Lettuce: a flat top and a scalloped lower edge.
const LETTUCE = (() => {
  let d = 'M5.4 13H25.6Q27 13 27 14.4V17';
  const n = 6, w = 23 / n;
  for (let i = 1; i <= n; i++) d += `A${f(w / 2)} 1.6 0 0 1 ${f(27 - w * i)} 17`;
  return d + 'V14.4Q4 13 5.4 13Z';
})();

export default defineIcon({
  name: 'sandwich',
  zh: '三明治',
  category: 'food',
  tags: ['burger', 'lunch', 'bread', 'snack', 'fast food', '午餐', '汉堡'],
  variants: ['plus'],
  // A sandwich; its top slice lifts open on hover to show the filling.
  svg: (u) => {
    const bottom = rr(4.4, 16.8, 22.2, 5.8, 2.4);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${bottom}" fill="${u.upS}"/></g></g><path d="${bottom}" ${OL}/>
      <g filter="${u.hi}"><path d="${LETTUCE}" fill="${u.loS}"/></g><path d="${LETTUCE}" ${OL}/>
      <g data-n="top"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${TOP}" fill="${u.upS}"/></g></g><path d="${TOP}" ${OL}/></g>`;
  },
  target: (h) => ({ a: h ? -13 : 0 }),
  draw(p, E) { at(E.top, { transform: `rotate(${f(p.a)} 4.6 15)` }); }
});
