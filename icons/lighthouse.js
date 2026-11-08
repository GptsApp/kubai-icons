import { defineIcon, f, SOFT, rp, rr, at, scaleAt } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const TOWER = rp([[11.8, 11.8], [19.2, 11.8], [22, 22.6], [9, 22.6]], [0.4, 0.4, 1.6, 1.6]);
const BEAM = 'M13 6.2L2.8 3.4V10.6L13 8.2ZM18 6.2L28.2 3.4V10.6L18 8.2Z';

export default defineIcon({
  name: 'lighthouse',
  zh: '灯塔',
  category: 'travel',
  tags: ['beacon', 'coast', 'harbor', 'sea', 'navigation', 'guide', '海岸'],
  // A striped lighthouse under its lantern; on hover the lamp casts beams to both sides.
  svg: (u) => `<path data-n="bm" d="${BEAM}" ${SOFT}/>
    ${back(u, rr(12.2, 3.4, 6.6, 6.4, 0.6), u.loS)}
    <path d="${rr(13.5, 5.2, 4, 2.8, 0.8)}" fill="#fff"/>
    <clipPath id="${u.id('tw')}"><path d="${TOWER}"/></clipPath>
    ${back(u, TOWER, u.loS)}
    <path d="M6 14.8H25V17.8H6Z" fill="#fff" clip-path="url(#${u.id('tw')})"/>
    ${front(u, rr(9.8, 9.4, 11.4, 2.6, 1.3), u.upS)}
    ${front(u, rp([[10.8, 4.4], [15.5, 0.4], [20.2, 4.4]], [0.8, 1, 0.8]), u.upS)}`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    at(E.bm, { transform: scaleAt(Math.max(0.001, p.s), 15.5, 7.2, 1), opacity: f(Math.min(1, p.s * 3)) });
  }
});
