import { defineIcon, KR, f, OL, DEEPS, R, rp, at, scaleAt } from '../packages/core/src/kit.js';

const LOAF = 'M4.2 12.4C4.2 7.2 9.2 3.8 15.5 3.8C21.8 3.8 26.8 7.2 26.8 12.4Q26.8 14.8 24.4 14.8H6.6Q4.2 14.8 4.2 12.4Z';

export default defineIcon({
  name: 'bread',
  zh: '面包',
  category: 'food',
  tags: ['loaf', 'bakery', 'baking', 'breakfast', 'toast', '烘焙', '吐司'],
  variants: ['plus'],
  // A scored loaf of bread with a domed crust; the crust puffs up as it rises on hover.
  svg: (u) => {
    const base = rp(R(5.6, 10.4, 19.8, 12.4), [1.8, 1.8, KR, KR]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.loS}"/></g></g><path d="${base}" ${OL}/>
      <g data-n="loaf"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${LOAF}" fill="${u.upS}"/></g></g><path d="${LOAF}" ${OL}/>
      <path d="M10.4 11L12.8 7.4M16.4 11L18.8 7.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>`;
  },
  target: (h) => ({ y: h ? -1.8 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) { at(E.loaf, { transform: `translate(0 ${f(p.y)}) ${scaleAt(p.s, 15.5, 14.8)}` }); }
});
