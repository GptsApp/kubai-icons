import { defineIcon, KR, CR, f, OL, DEEPS, SOFT, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'warehouse',
  zh: '仓库',
  category: 'home',
  tags: ['storage', 'depot', 'inventory', 'logistics', 'garage', '库房'],
  variants: ['plus', 'check', 'search', 'lock'],
  // A gabled warehouse whose roller door rolls up on hover, showing a crate inside.
  svg: (u) => {
    const body = rp([[4, 22.8], [4, 9.8], [15.5, 3.4], [27, 9.8], [27, 22.8]], [KR, 1.4, 2.2, 1.4, KR]);
    const way = rp(R(9, 12.4, 13, 10.4), [CR, CR, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${way}" fill="#fff"/>
      <path d="${rr(10.8, 17.8, 5, 5, 0.8)}" ${SOFT}/>
      <clipPath id="${u.id('door')}"><path data-n="clip"/></clipPath>
      <g filter="${u.hi}"><path data-n="door" fill="${u.upS}"/></g>
      <path data-n="slats" clip-path="url(#${u.id('door')})" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS} stroke-opacity=".45"/>
      <path data-n="doorO" ${OL}/>`;
  },
  target: (h) => ({ h: h ? 3 : 10.4 }),
  draw(p, E) {
    const d = rp(R(9, 12.4, 13, p.h), [CR, CR, 0, 0]), b = 12.4 + p.h;
    at(E.door, { d }); at(E.doorO, { d }); at(E.clip, { d });
    at(E.slats, { d: `M11.4 ${f(b - 2.8)}H19.6M11.4 ${f(b - 5.8)}H19.6` });
  }
});
