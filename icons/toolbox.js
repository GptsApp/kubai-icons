import { defineIcon, KR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(4, 8.6, 23, 14, KR);
const LID = rp(R(4, 8.6, 23, 4.6), [KR, KR, 0, 0]);
const HANDLE = rp([[10, 11], [10, 1.6], [21, 1.6], [21, 11], [18.4, 11], [18.4, 4.2], [12.6, 4.2], [12.6, 11]], [0, 1.8, 1.8, 0, 0, 0.6, 0.6, 0]);

export default defineIcon({
  name: 'toolbox',
  zh: '工具箱',
  category: 'tools',
  tags: ['tools', 'kit', 'repair', 'utilities', '工具'],
  variants: ['plus', 'check', 'search', 'lock'],
  // A toolbox with a carry handle and a latch; on hover the handle is pulled up to carry it.
  svg: (u) => `<g data-n="hd"><g filter="${u.hi}"><path d="${HANDLE}" fill="${u.loS}"/></g><path d="${HANDLE}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.lo(14)}"/></g></g><path d="${BODY}" ${OL}/>
    <g filter="${u.hi}"><path d="${LID}" fill="${u.upS}"/></g><path d="${LID}" ${OL}/>
    <path d="${rr(13.1, 10.8, 4.8, 4.4, 1)}" fill="#fff"/>`,
  target: (h) => ({ y: h ? -1.6 : 0 }),
  draw(p, E) { at(E.hd, { transform: `translate(0 ${f(p.y)})` }); }
});
