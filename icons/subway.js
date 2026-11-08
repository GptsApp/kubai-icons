import { defineIcon, CR, f, DEEP, rr, at, scaleAt } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const PORTAL = 'M4 22.6V11.5A11.5 11.5 0 0 1 27 11.5V22.6Z';
const BORE = 'M7.6 22.6V12.6A7.9 7.9 0 0 1 23.4 12.6V22.6Z';

export default defineIcon({
  name: 'subway',
  zh: '地铁',
  category: 'transport',
  tags: ['metro', 'underground', 'tube', 'subway', 'transit', 'tunnel', '轨道交通'],
  variants: ['check', 'clock', 'alert'],
  // A metro train in its tunnel mouth; on hover its lamps light and it pulls nearer.
  svg: (u) => `${back(u, PORTAL, u.loS)}
    <path d="${BORE}" fill="${u.pure('#2F6FE0')}"/>
    <g data-n="tr">${front(u, rr(10.4, 9.6, 10.2, 13, 3), u.upS)}
      <path d="${rr(12.2, 11.6, 6.6, 4, CR)}" fill="#fff"/>
      <circle cx="13" cy="19.2" r="1.7" ${DEEP}/><circle cx="18" cy="19.2" r="1.7" ${DEEP}/>
      <g data-n="lit"><circle cx="13" cy="19.2" r="1.2" fill="#fff"/><circle cx="18" cy="19.2" r="1.2" fill="#fff"/></g></g>`,
  target: (h) => ({ s: h ? 1.1 : 1, lit: h ? 1 : 0 }),
  draw(p, E) {
    at(E.tr, { transform: scaleAt(p.s, 15.5, 22.6) });
    at(E.lit, { opacity: f(p.lit) });
  }
});
