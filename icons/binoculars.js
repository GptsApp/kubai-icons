import { defineIcon, f, OL, rr, circ, at } from '../packages/core/src/kit.js';

const L = 8.7, Rx = 22.3;

export default defineIcon({
  name: 'binoculars',
  zh: '望远镜',
  category: 'travel',
  tags: ['binoculars', 'explore', 'view', 'sightseeing', 'watch', 'search', '双筒望远镜'],
  // A pair of binoculars; on hover the eyepieces wind out as they are focused.
  svg: (u) => {
    const tubes = rr(L - 3.3, 4.6, 6.6, 14, 2.4) + rr(Rx - 3.3, 4.6, 6.6, 14, 2.4);
    const lens = circ(L, 17.6, 4.8) + circ(Rx, 17.6, 4.8), eye = rr(L - 2.2, 0, 4.4, 4.6, 1.2) + rr(Rx - 2.2, 0, 4.4, 4.6, 1.2);
    const bridge = rr(11, 8.2, 9, 3.4, 0.8);
    return `<g data-n="ey"><g filter="${u.hi}"><path d="${eye}" fill="${u.upS}"/></g><path d="${eye}" ${OL}/></g>
      <g filter="${u.hi}"><path d="${bridge}" fill="${u.upS}"/></g><path d="${bridge}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${tubes}" fill="${u.loS}"/></g></g><path d="${tubes}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${lens}" fill="${u.upS}"/></g></g><path d="${lens}" ${OL}/>
      <path d="${circ(L, 17.6, 2.4) + circ(Rx, 17.6, 2.4)}" fill="#fff"/>`;
  },
  target: (h) => ({ y: h ? 0.8 : 2.4 }),
  draw(p, E) { at(E.ey, { transform: `translate(0 ${f(p.y)})` }); }
});
