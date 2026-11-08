import { defineIcon, f, OL, DEEP, DEEPS, rp, rattle, clamp01 } from '../packages/core/src/kit.js';
import { moveAll } from './_science-edu-sports.js';

const P0 = [5.6, 1.8], P1 = [6.4, 8.2], P2 = [10.2, 11.6], P3 = [15.5, 13.8];
const CHAIN = (s) => `M${s(P0)}C${s(P1)} ${s(P2)} ${s(P3)}`;
const xy = (p) => `${p[0]} ${p[1]}`;
const mirror = (p) => `${31 - p[0]} ${p[1]}`;
// The point at t along the left half of the chain.
const onChain = (t) => [0, 1].map((i) => {
  const m = 1 - t;
  return f(m * m * m * P0[i] + 3 * m * m * t * P1[i] + 3 * m * t * t * P2[i] + t * t * t * P3[i]);
});
const BEADS = [0.3, 0.58, 0.84].map(onChain).flatMap((p) => [p, [31 - p[0], p[1]]]);

const GEM = rp([[11, 13.2], [20, 13.2], [24, 17.2], [15.5, 24.4], [7, 17.2]], [1, 1, 1, 1.2, 1]);
const CROWN = rp([[11, 13.2], [20, 13.2], [24, 17.2], [7, 17.2]], [1, 1, 0.6, 0.6]);

export default defineIcon({
  name: 'necklace',
  zh: '项链',
  category: 'commerce',
  tags: ['jewelry', 'pendant', 'chain', 'gem', 'accessory', 'fashion', '首饰', '吊坠'],
  variants: ['plus', 'check', 'heart'],
  // A fine beaded chain holding a large cut gem; on hover the gem swings and settles.
  svg: (u) => `<path d="${CHAIN(xy)}${CHAIN(mirror)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    ${BEADS.map((b) => `<circle cx="${b[0]}" cy="${b[1]}" r="1.7" ${DEEP}/>`).join('')}
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="p"><path d="${GEM}" fill="${u.loS}"/><path d="${CROWN}" fill="${u.upS}"/></g></g></g>
    <g data-n="pO"><path d="${GEM}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { moveAll(E, ['p'], `rotate(${f(rattle(clamp01(p.o), 22, 3))} 15.5 13.2)`); }
});
