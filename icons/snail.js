import { defineIcon, f, OL, DEEP, DEEPS, WHITES, rr, circ, at } from '../packages/core/src/kit.js';
import { capsule } from './_w2-people.js';

const BODY = rr(3.4, 18.6, 22.6, 4.6, 2.3) + capsule([23.6, 20.6], [24.6, 13.6], 4.6);
const C = [12.8, 12.4];
// A spiral of three half turns, each 1.6 wider than the last, ending on the shell's left.
const SPIRAL = `M${C[0] + 1.6} ${C[1]}A1.6 1.6 0 0 0 ${C[0] - 1.6} ${C[1]}A3.2 3.2 0 0 0 ${C[0] + 4.8} ${C[1]}A4.8 4.8 0 0 0 ${C[0] - 4.8} ${C[1]}`;

export default defineIcon({
  name: 'snail',
  zh: '蜗牛',
  category: 'nature',
  tags: ['snail', 'slow', 'shell', 'garden', 'animal', 'loading', '慢'],
  // A snail carrying its spiral shell; on hover it creeps forward and stretches its eye stalks.
  svg: (u) => `<g data-n="s">
    <g data-n="k"><path d="M23.4 12.4L21.8 7.6M25.6 12.4L27 7.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <circle cx="21.6" cy="7" r="1.3" ${DEEP}/><circle cx="27.2" cy="7.2" r="1.3" ${DEEP}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.upS}"/></g></g><path d="${BODY}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(C[0], C[1], 8.2)}" fill="${u.loS}"/></g></g><path d="${circ(C[0], C[1], 8.2)}" ${OL}/>
    <path d="${SPIRAL}" fill="none" class="ln" ${WHITES}/></g>`,
  target: (h) => ({ x: h ? 0.8 : 0, k: h ? -1.4 : 0 }),
  draw(p, E) {
    at(E.s, { transform: `translate(${f(p.x)} 0)` });
    at(E.k, { transform: `translate(24.6 13.6) scale(1 ${f(1 - p.k / 5.8)}) translate(-24.6 -13.6)` });
  }
});
