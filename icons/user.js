import { defineIcon, f, OL, rp, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'user',
  zh: '用户',
  category: 'people',
  tags: ['person', 'account', 'profile', 'avatar'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'search', 'cog', 'star', 'heart', 'clock', 'alert', 'sync', 'sparkle', 'bolt'],
  // An avatar in a round frame; on hover the person looks up.
  svg: (u) => {
    const disc = circ(15.5, 12.5, 11.5);
    return `<clipPath id="${u.id('av')}"><path d="${disc}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${disc}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('av')})">
        <path data-n="body" d="${rp([[5, 27], [5, 22], [10.4, 17.4], [20.6, 17.4], [26, 22], [26, 27]], [0, 0, 4, 4, 0, 0])}" fill="#fff"/>
      </g>
      <circle data-n="head" cx="15.5" cy="10.4" r="4.4" fill="#fff"/>
      <path d="${disc}" ${OL}/>`;
  },
  target: (h) => ({ lift: h ? -2.1 : 0 }),
  draw(p, E) {
    at(E.head, { cy: f(10.4 + p.lift) });
    at(E.body, { transform: `translate(0 ${f(p.lift * 0.4)})` });
  }
});
