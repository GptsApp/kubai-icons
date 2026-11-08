import { defineIcon, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const COLS = [7, 9.9, 19.1, 22].map((x) => rp(R(x, 9.6, 1.9, 9.6), 0.4)).join('');
const DOOR = 'M12.9 18.8V14.4A2.6 2.6 0 0 1 18.1 14.4V18.8Z';

export default defineIcon({
  name: 'museum',
  zh: '博物馆',
  category: 'travel',
  tags: ['gallery', 'exhibition', 'art', 'history', 'culture', 'sightseeing', '展览', '美术馆'],
  variants: ['heart', 'star', 'clock', 'check'],
  // A columned museum with a tall arched door; on hover the two door leaves swing wide
  // open.
  svg: (u) => `${back(u, rr(5.6, 8, 19.8, 11.6, 0.6), u.loS)}
    <path d="${COLS}" fill="#fff"/>
    <path d="${DOOR}" fill="${u.pure('#2F6FE0')}"/>
    <clipPath id="${u.id('dr')}"><path d="${DOOR}"/></clipPath>
    <g clip-path="url(#${u.id('dr')})"><path data-n="l" fill="#fff"/><path data-n="r" fill="#fff"/></g>
    ${front(u, rp([[3.8, 9.2], [15.5, 1.6], [27.2, 9.2]], [1.2, 1.8, 1.2]), u.upS)}
    ${front(u, rr(3.8, 18.6, 23.4, 4.2, 1.6), u.upS)}`,
  target: (h) => ({ w: h ? 0 : 2.6 }),
  draw(p, E) {
    at(E.l, { d: rp(R(12.9, 11, p.w, 8), 0) });
    at(E.r, { d: rp(R(18.1 - p.w, 11, p.w, 8), 0) });
  }
});
