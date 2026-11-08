import { defineIcon, rp, rr, at, DEEP } from '../packages/core/src/kit.js';
import { back, wheel, setD } from './_b6-vehicles.js';

export default defineIcon({
  name: 'forklift',
  zh: '叉车',
  category: 'transport',
  tags: ['lift truck', 'warehouse', 'pallet', 'logistics', 'loading', '仓储', '搬运'],
  // A forklift with a crate on its forks; on hover the forks raise the crate up the mast.
  svg: (u) => {
    const guard = rp([[5.4, 3], [15.6, 3], [18.2, 12], [5.4, 12]], [1.8, 1.6, 0, 0]);
    return `<g transform="translate(-0.4 0)">
      ${back(u, guard, u.loS)}
      <path d="${rp([[7.6, 5.2], [14.4, 5.2], [16, 11.8], [7.6, 11.8]], [1, 0.8, 0, 0])}" fill="#fff"/>
      ${back(u, rr(19.2, 1.6, 2.6, 21, 1), u.loS)}
      ${back(u, rr(3.6, 11, 15, 8.6, 2.2), u.upS)}
      ${wheel(u, 7.6, 19.6, 3)}${wheel(u, 15.2, 19.6, 3)}
      ${back(u, '', u.upS, 'b')}<path data-n="tp" ${DEEP}/>
      <path data-n="fo" fill="${u.pure('#2F6FE0')}"/></g>`;
  },
  target: (h) => ({ y: h ? 12 : 18.4 }),
  draw(p, E) {
    const y = p.y;
    setD(E, 'b', rr(22.6, y - 7.4, 5.4, 7.4, 1.2));
    at(E.tp, { d: rr(24.1, y - 7.4, 2.4, 3, 0.4) });
    at(E.fo, { d: rr(21.8, y, 6.8, 2.6, 0.9) + rr(21.8, y - 3.8, 2.4, 6, 0.8) });
  }
});
