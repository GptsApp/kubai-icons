import { defineIcon, KR, f, OL, DEEP, rp, rr, at } from '../packages/core/src/kit.js';

const NOTE = rp([[11.6, 8.2], [17.2, 7], [17.2, 9.6], [13.4, 10.4], [13.4, 15.6], [11.6, 15.6]], [0.6, 0.6, 0.4, 0.3, 0.6, 0.6])
  + 'M7.6 15.6A2.9 2.2 0 1 1 13.4 15.6A2.9 2.2 0 1 1 7.6 15.6Z';

export default defineIcon({
  name: 'music-library',
  zh: '音乐库',
  category: 'media',
  tags: ['collection', 'albums', 'songs', 'library', 'records', '曲库'],
  variants: ['plus', 'check', 'x', 'heart', 'star', 'down', 'up', 'sync', 'search', 'lock', 'clock'],
  // A stack of albums with a note on the top one; on hover the back album is pulled up out of the stack.
  svg: (u) => {
    const b2 = rr(8, 1.6, 15, 12, KR), b1 = rr(6, 4.6, 19, 12, KR), front = rr(4, 7.6, 23, 14.4, KR);
    return `<g data-n="pull"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${b2}" fill="${u.loS}"/></g></g><path d="${b2}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${b1}" fill="${u.loS}"/></g></g><path d="${b1}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${front}" fill="${u.upS}"/></g></g><path d="${front}" ${OL}/>
    <path d="${NOTE}" transform="translate(3.1 2.6)" ${DEEP}/>`;
  },
  target: (h) => ({ y: h ? -2 : 0 }),
  draw(p, E) { at(E.pull, { transform: `translate(0 ${f(p.y)})` }); }
});
