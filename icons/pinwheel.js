import { defineIcon, f, OL, DEEP, DEEPS, rp, at } from '../packages/core/src/kit.js';

const C = [15.5, 10.6], A = 7.6;
// Four half-square blades, turned a quarter each; opposite blades share a tone.
const rot = ([x, y], k) => (k === 0 ? [x, y] : k === 1 ? [-y, x] : k === 2 ? [-x, -y] : [y, -x]);
const blade = (k) => rp([[0, 0], [0, -A * 1.32], [A * 1.1, -A * 1.1]].map((pt) => rot(pt, k)), [0.3, 1, 1]);
const SETA = blade(0) + blade(2), SETB = blade(1) + blade(3);

export default defineIcon({
  name: 'pinwheel',
  zh: '风车',
  category: 'sports',
  tags: ['windmill', 'toy', 'spin', 'wind', 'summer', 'kids', '玩具', '纸风车'],
  // A paper pinwheel on a stick; on hover the wind spins it round once.
  svg: (u) => `<path d="M15.5 13V24.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${SETA}" fill="${u.loS}"/></g></g></g>
    <g data-n="aO"><path d="${SETA}" ${OL}/></g>
    <g filter="${u.hi}"><g data-n="b"><path d="${SETB}" fill="${u.upS}"/></g></g>
    <g data-n="bO"><path d="${SETB}" ${OL}/></g>
    <circle cx="${C[0]}" cy="${C[1]}" r="1.6" ${DEEP}/>`,
  target: (h) => ({ a: h ? 360 : 0 }),
  draw(p, E) {
    const t = `translate(${C[0]} ${C[1]}) rotate(${f(p.a)})`;
    ['a', 'aO', 'b', 'bO'].forEach((n) => at(E[n], { transform: t }));
  }
});
