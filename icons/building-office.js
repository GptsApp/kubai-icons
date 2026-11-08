import { defineIcon, KR, CR, f, OL, SOFT, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'building-office',
  zh: '办公楼',
  category: 'home',
  tags: ['office', 'company', 'business', 'work', 'headquarters', '公司', '写字楼'],
  variants: ['plus', 'check', 'x', 'lock', 'search', 'cog'],
  // A tower with a low front wing; the wing's glass doors slide apart on hover.
  svg: (u) => {
    const tower = rr(11.4, 1, 13.3, 23, KR), wing = rp(R(6.3, 9.6, 11, 14.4), [1.8, 1.8, 0, KR]);
    const way = rp(R(9.2, 16.8, 5.2, 7.2), [CR, CR, 0, 0]);
    const win = rr(14.2, 3.6, 3.4, 3, 0.8) + rr(19.6, 3.6, 3.4, 3, 0.8) + rr(19.6, 10.4, 3.4, 3, 0.8) + rr(19.6, 15.6, 3.4, 3, 0.8);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${tower}" fill="${u.loS}"/></g></g><path d="${tower}" ${OL}/>
      <path d="${win}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${wing}" fill="${u.upS}"/></g></g><path d="${wing}" ${OL}/>
      <path d="${way}" fill="#fff"/>
      <clipPath id="${u.id('way')}"><path d="${way}"/></clipPath>
      <g clip-path="url(#${u.id('way')})"><path data-n="dl" d="${rr(9.2, 16.8, 2.6, 7.2, 0)}" ${SOFT}/><path data-n="dr" d="${rr(11.8, 16.8, 2.6, 7.2, 0)}" ${SOFT}/></g>`;
  },
  target: (h) => ({ x: h ? 2.6 : 0 }),
  draw(p, E) {
    at(E.dl, { transform: `translate(${f(-p.x)} 0)` });
    at(E.dr, { transform: `translate(${f(p.x)} 0)` });
  }
});
