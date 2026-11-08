import { defineIcon, f, OL, rr, circ, at } from '../packages/core/src/kit.js';

const CUP = 'M8.4 2.6H22.6V9.8C22.6 13.8 19.4 16.8 15.5 16.8C11.6 16.8 8.4 13.8 8.4 9.8Z';
const HANDLES = circ(8.4, 7.6, 4.2) + circ(8.4, 7.6, 2.2) + circ(22.6, 7.6, 4.2) + circ(22.6, 7.6, 2.2);
const STEM = rr(13.6, 15.4, 3.8, 5, 0.6), BASE = rr(9.4, 19.6, 12.2, 3.8, 1.6);

export default defineIcon({
  name: 'trophy',
  zh: '奖杯',
  category: 'sports',
  tags: ['cup', 'winner', 'prize', 'champion', 'award', '冠军'],
  variants: ['star', 'check'],
  // A two-handled cup on a stand; on hover a glint sweeps across the cup.
  svg: (u) => `<clipPath id="${u.id('tp')}"><path d="${CUP}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HANDLES}" fill="${u.upS}" fill-rule="evenodd"/></g></g><path d="${HANDLES}" fill-rule="evenodd" ${OL}/>
    <g filter="${u.sh}"><path d="${STEM}" fill="${u.loS}"/></g><path d="${STEM}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CUP}" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('tp')})"><path data-n="gl" fill="#fff" opacity=".7"/></g>
    <path d="${CUP}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BASE}" fill="${u.upS}"/></g></g><path d="${BASE}" ${OL}/>`,
  target: (h) => ({ x: h ? 22.4 : 12.2 }),
  draw(p, E) { const x = p.x; at(E.gl, { d: `M${f(x)} 1H${f(x + 2.6)}L${f(x - 2.4)} 18H${f(x - 5)}Z` }); }
});
