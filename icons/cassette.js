import { defineIcon, KR, CR, f, OL, DEEP, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'cassette',
  zh: '磁带',
  category: 'media',
  tags: ['tape', 'mixtape', 'audio', 'retro', 'recording', '卡带'],
  // A cassette tape; on hover the tape winds from the left reel onto the right one.
  svg: (u) => {
    const body = rr(4, 3.6, 23, 17.8, KR);
    const foot = rp([[8.6, 21.4], [10.4, 17.2], [20.6, 17.2], [22.4, 21.4]], [0, 1.4, 1.4, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path d="${rr(7.4, 6.4, 16.2, 8.2, CR)}" fill="#fff"/>
    <circle data-n="l" cx="11.6" cy="10.5" fill="${u.pure('#5393FF')}"/><circle data-n="r" cx="19.4" cy="10.5" fill="${u.pure('#5393FF')}"/>
    <circle cx="11.6" cy="10.5" r="1.2" fill="#fff"/><circle cx="19.4" cy="10.5" r="1.2" fill="#fff"/>
    <g filter="${u.hi}"><path d="${foot}" fill="${u.upS}"/></g><path d="${foot}" ${OL}/>
    <circle cx="13.2" cy="19.3" r="1.2" ${DEEP}/><circle cx="17.8" cy="19.3" r="1.2" ${DEEP}/>`;
  },
  target: (h) => ({ l: h ? 2.4 : 3.4, r: h ? 3.4 : 2.4 }),
  draw(p, E) { at(E.l, { r: f(p.l) }); at(E.r, { r: f(p.r) }); }
});
