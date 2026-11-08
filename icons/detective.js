import { defineIcon, f, OL, DEEPS, rp, rr, circ, at } from '../packages/core/src/kit.js';

const CROWN = rp([[9.2, 9.4], [10.6, 1.6], [15.5, 3.2], [20.4, 1.6], [21.8, 9.4]], [0, 2, 1.6, 2, 0]);
const BRIM = rr(3.6, 8.4, 23.8, 3, 1.5);
const LENSES = circ(10.6, 19, 3.6) + circ(20.4, 19, 3.6);

export default defineIcon({
  name: 'detective',
  zh: '隐身侦探',
  category: 'security',
  tags: ['incognito', 'spy', 'private', 'anonymous', 'hat', 'glasses', '无痕'],
  // A brimmed hat over a pair of glasses; on hover the hat is tipped.
  svg: (u) => `
    <path d="M14.2 18.6Q15.5 17.2 16.8 18.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${LENSES}" fill="${u.upS}"/></g></g>
    <path d="${LENSES}" ${OL}/>
    <g filter="${u.sh}"><g data-n="hat"><g filter="${u.hi}"><path d="${CROWN}" fill="${u.loS}"/></g><path d="${CROWN}" ${OL}/>
      <g filter="${u.hi}"><path d="${BRIM}" fill="${u.upS}"/></g><path d="${BRIM}" ${OL}/></g></g>`,
  target: (h) => ({ y: h ? -1 : 0, a: h ? -8 : 0 }),
  draw(p, E) { at(E.hat, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 3.6 9.9)` }); }
});
