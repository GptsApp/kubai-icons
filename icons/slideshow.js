import { defineIcon, KR, CR, f, OL, SOFT, rp, rr, at } from '../packages/core/src/kit.js';

const SHIFT = 21;

export default defineIcon({
  name: 'slideshow',
  zh: '幻灯片',
  category: 'media',
  tags: ['carousel', 'gallery', 'slides', 'presentation', 'photos', '轮播'],
  variants: ['plus', 'check'],
  // A screen showing one slide of a set, with page dots below; on hover the next slide slides in.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR), screen = rr(6, 5.3, 19, 11.4, CR);
    return `<clipPath id="${u.id('sc')}"><path d="${screen}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path d="${screen}" fill="#fff"/>
    <g clip-path="url(#${u.id('sc')})"><g data-n="track">
      <circle cx="20.4" cy="8.8" r="1.8" ${SOFT}/>
      <path d="${rp([[4, 18], [4, 15.4], [11.4, 9.6], [19, 16], [19, 18]], [0, 0, 1.4, 0, 0])}" ${SOFT}/>
      <path d="${rp([[10, 18], [10, 16.6], [17.6, 11.6], [27, 17], [27, 18]], [0, 0, 1.4, 0, 0])}" fill="${u.pure('#5393FF')}"/>
      <g transform="translate(${SHIFT} 0)">
        <circle cx="11" cy="9.6" r="2.4" fill="${u.pure('#5393FF')}"/>
        <path d="${rp([[4, 18], [4, 14.2], [15.5, 10.6], [27, 14.2], [27, 18]], [0, 0, 6, 0, 0])}" ${SOFT}/>
      </g></g></g>
    <path data-n="dots" fill="#fff" data-w="fill"/>`;
  },
  target: (h) => ({ x: h ? -SHIFT : 0, w: h ? [2.4, 4.6, 2.4] : [4.6, 2.4, 2.4] }),
  draw(p, E) {
    at(E.track, { transform: `translate(${f(p.x)} 0)` });
    const total = p.w[0] + p.w[1] + p.w[2] + 2 * 1.6;
    let x = 15.5 - total / 2, d = '';
    for (const w of p.w) { d += rr(x, 18, w, 2.4, 1.2); x += w + 1.6; }
    at(E.dots, { d });
  }
});
