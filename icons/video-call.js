import { defineIcon, KR, CR, f, OL, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'video-call',
  zh: '视频通话',
  category: 'communication',
  tags: ['video chat', 'meeting', 'conference', 'facetime', 'webcam', '视频会议'],
  variants: ['plus', 'x', 'clock', 'lock'],
  off: true,
  // A screen showing the other caller beside your own small view; on hover the caller
  // leans in and your view slides into the corner.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR), screen = rr(6.4, 5.7, 18.2, 13.6, CR);
    return `<clipPath id="${u.id('sc')}"><path d="${screen}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${screen}" fill="#fff"/>
      <g clip-path="url(#${u.id('sc')})"><g data-n="pp" data-t="fill:#97BEFF">
        <path d="${circ(13.6, 10.6, 2.9)}"/><path d="${rp(R(7.8, 15.6, 11.6, 6), [4.8, 4.8, 0, 0])}"/></g></g>
      <g data-n="me"><g filter="${u.hi}"><path d="${rr(0, 0, 5.4, 6.4, 1.2)}" fill="${u.upS}"/></g><path d="${rr(0, 0, 5.4, 6.4, 1.2)}" ${OL}/></g>`;
  },
  target: (h) => ({ lift: h ? -0.8 : 0, me: h ? [18.6, 7.4] : [18.2, 8.2] }),
  draw(p, E) {
    at(E.pp, { transform: `translate(13.6 ${f(13.6 + p.lift)}) scale(${f(1 - p.lift * 0.06)}) translate(-13.6 -13.6)` });
    at(E.me, { transform: `translate(${f(p.me[0])} ${f(p.me[1])})` });
  }
});
