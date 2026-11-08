import { defineIcon, f, OL, DEEPS, circ, at } from '../packages/core/src/kit.js';

const PATH = 'M7.2 19.6H19.6A3.6 3.6 0 0 0 19.6 12.4H11.4A3.6 3.6 0 0 1 11.4 5.2H23.8';

export default defineIcon({
  name: 'route',
  zh: '路线',
  category: 'travel',
  tags: ['path', 'directions', 'journey', 'trip', 'way', '行程'],
  variants: ['plus', 'check', 'x', 'clock', 'search', 'star'],
  // A winding dashed route from a start point to a destination; on hover the dashes run
  // along it toward the destination.
  svg: (u) => `<path data-n="r" d="${PATH}" fill="none" stroke-width="2.2" stroke-dasharray="3.4 2.6" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(7.2, 19.6, 3)}" fill="${u.upS}"/></g></g><path d="${circ(7.2, 19.6, 3)}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(23.8, 5.2, 3.4)}" fill="${u.loS}"/></g></g><path d="${circ(23.8, 5.2, 3.4)}" ${OL}/>
    <circle cx="23.8" cy="5.2" r="1.3" fill="#fff"/>`,
  target: (h) => ({ off: h ? -12 : 0 }),
  draw(p, E) { at(E.r, { 'stroke-dashoffset': f(p.off) }); }
});
