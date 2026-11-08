import { defineIcon, f, OL, DEEP, rp, circ, at } from '../packages/core/src/kit.js';
import { band } from './_science-edu-sports.js';

const DECK = 'M4 7.4Q5.8 10.6 8.8 10.6H22.2Q25.2 10.6 27 7.4';
const TRUCKS = rp([[7.8, 11.6], [12.6, 11.6], [11.6, 14], [8.8, 14]], 0.4) + rp([[18.4, 11.6], [23.2, 11.6], [22.2, 14], [19.4, 14]], 0.4);
const WHEELS = circ(10.2, 16.6, 3.2) + circ(20.8, 16.6, 3.2);

export default defineIcon({
  name: 'skateboard',
  zh: '滑板',
  category: 'sports',
  tags: ['skate', 'board', 'street', 'ride', 'sport', '极限运动'],
  // A skateboard side on; on hover the tail pops down and the nose lifts into an ollie.
  svg: (u) => `<g data-n="g">
    <path d="${TRUCKS}" ${DEEP}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${WHEELS}" fill="${u.upS}"/></g></g><path d="${WHEELS}" ${OL}/>
    ${band(u, DECK, 3.6, u.loS)}</g>`,
  target: (h) => ({ a: h ? -14 : 0, y: h ? -1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(0 ${f(0.6 + p.y)}) rotate(${f(p.a)} 10.2 19.8)` }); }
});
