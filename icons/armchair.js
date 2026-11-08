import { defineIcon, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'armchair',
  zh: '扶手椅',
  category: 'home',
  tags: ['chair', 'seat', 'furniture', 'recliner', 'lounge', '椅子'],
  variants: ['plus', 'check'],
  // An armchair from the front; its back reclines on hover, dipping out of sight.
  svg: (u) => {
    const arms = rr(4.8, 10, 5.4, 11.4, 2.4) + rr(20.8, 10, 5.4, 11.4, 2.4), seat = rr(9.2, 13.6, 12.6, 6.8, 1.8);
    return `<path d="${rr(6.2, 20.4, 2.6, 3, 0.8) + rr(22.2, 20.4, 2.6, 3, 0.8)}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="back" fill="${u.loS}"/></g></g><path data-n="backO" ${OL}/>
      <g filter="${u.hi}"><path d="${seat}" fill="${u.upS}"/></g><path d="${seat}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${arms}" fill="${u.loS}"/></g></g><path d="${arms}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 5.4 : 2.2 }),
  draw(p, E) {
    const d = rr(8.2, p.y, 14.6, 16 - p.y, 3.4);
    at(E.back, { d }); at(E.backO, { d });
  }
});
