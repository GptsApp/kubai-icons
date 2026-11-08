import { defineIcon, f, OL, circ, sector, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { circCw } from './_b6-vehicles.js';

const RING = circ(15.5, 12.5, 11.5) + circCw(15.5, 12.5, 5.4);
const BANDS = [45, 135, 225, 315].map((a) => sector(a - 17, 34, 16)).join('');

export default defineIcon({
  name: 'lifebuoy',
  zh: '救生圈',
  category: 'travel',
  tags: ['life ring', 'life preserver', 'rescue', 'support', 'help', 'safety', '救援', '帮助'],
  // A ring buoy with four white bands; on hover it turns a quarter and bobs on the water.
  svg: (u) => `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${RING}" fill="${u.loS}"/></g></g>
    <clipPath id="${u.id('r')}"><path d="${RING}"/></clipPath>
    <g clip-path="url(#${u.id('r')})"><path data-n="s" d="${BANDS}" fill="#fff"/></g>
    <path d="${RING}" ${OL}/></g>`,
  target: (h) => ({ a: h ? 90 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.s, { transform: `rotate(${f(p.a)} 15.5 12.5)` });
    at(E.b, { transform: `translate(0 ${f(rattle(clamp01(p.o), 1.6, 3))})` });
  }
});
