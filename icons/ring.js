import { defineIcon, f, OL, DEEPS, rp, circ, clamp01, rattle, at } from '../packages/core/src/kit.js';

const BAND = circ(15.5, 15.4, 8.4) + circ(15.5, 15.4, 5.6);
const GEM = rp([[11.2, 1.2], [19.8, 1.2], [23, 4.8], [15.5, 11.4], [8, 4.8]], [1, 1, 0.8, 1, 0.8]);

export default defineIcon({
  name: 'ring',
  zh: '戒指',
  category: 'people',
  tags: ['ring', 'diamond ring', 'engagement', 'wedding', 'jewelry', 'proposal', '婚戒'],
  variants: ['heart', 'star'],
  // A ring set with a cut gem; on hover it rocks to catch the light and settles.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r">
      <path d="${BAND}" fill-rule="evenodd" fill="${u.loS}"/><path d="${GEM}" fill="${u.upS}"/></g></g></g>
    <g data-n="rO"><path d="${BAND}" fill-rule="evenodd" ${OL}/><path d="${GEM}" stroke-linejoin="round" ${OL}/>
      <path d="M9.8 4.8H21.2" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 10, 2))} 15.5 15.4)`;
    at(E.r, { transform: t }); at(E.rO, { transform: t });
  }
});
