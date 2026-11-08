import { defineIcon, KR, f, OL, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'user-round',
  zh: '头像',
  category: 'people',
  tags: ['avatar', 'profile', 'account', 'person', 'member', '个人资料'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'search', 'cog', 'star', 'heart', 'clock', 'sync', 'alert', 'info', 'sparkle'],
  // A head-and-shoulders portrait on a square card; on hover the person looks up.
  svg: (u) => {
    const card = rr(5.2, 2.2, 20.6, 20.6, KR);
    return `<clipPath id="${u.id('cd')}"><path d="${card}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('cd')})"><path data-n="body" d="${rp(R(7.2, 16.4, 16.6, 9), [6.6, 6.6, 0, 0])}" fill="#fff"/></g>
      <path data-n="head" d="${circ(15.5, 9.4, 4.2)}" fill="#fff"/>
      <path d="${card}" ${OL}/>`;
  },
  target: (h) => ({ lift: h ? -2 : 0 }),
  draw(p, E) {
    at(E.head, { transform: `translate(0 ${f(p.lift)})` });
    at(E.body, { transform: `translate(0 ${f(p.lift * 0.4)})` });
  }
});
