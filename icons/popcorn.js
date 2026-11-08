import { defineIcon, KR, f, OL, WHITE, rp, circ, at, scaleAt } from '../packages/core/src/kit.js';

const BOX = rp([[6, 10.6], [25, 10.6], [22.6, 23.4], [8.4, 23.4]], [1.2, 1.2, KR, KR]);
// Kernels: same-winding circles plus a counter-clockwise block, outlined only outside.
const PUFF = [[8.8, 9.2, 3.2], [12.6, 6, 3.6], [18, 5.4, 3.8], [22.2, 8.8, 3.2], [15.4, 9.4, 3.2]].map(([x, y, r]) => circ(x, y, r)).join('') + 'M8.8 9V12H22.2V9Z';
// Stripes as [x at the top, x at the bottom], 2.6 wide.
const STRIPES = [[10.6, 11.6], [17.8, 16.8]];

export default defineIcon({
  name: 'popcorn',
  zh: '爆米花',
  category: 'food',
  tags: ['movie', 'cinema', 'snack', 'theater', 'film', '电影'],
  variants: [],
  // A striped bucket of popcorn; the popcorn puffs up as it pops on hover.
  svg: (u) => {
    const st = STRIPES.map(([a, b]) => `<path d="M${a} 10H${f(a + 2.6)}L${f(b + 2.6)} 24H${b}Z" ${WHITE}/>`).join('');
    return `<g data-n="puff"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PUFF}" fill="${u.upS}"/></g></g><path d="${PUFF}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOX}" fill="${u.loS}"/></g></g>
      <clipPath id="${u.id('box')}"><path d="${BOX}"/></clipPath><g clip-path="url(#${u.id('box')})">${st}</g>
      <path d="${BOX}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1.12 : 1 }),
  draw(p, E) { at(E.puff, { transform: scaleAt(p.s, 15.5, 11.6) }); }
});
