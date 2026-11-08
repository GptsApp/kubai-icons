import { defineIcon, f, DEEP, KR, circ, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid } from './_b2-kitchen.js';

const BOARD = rp([[6.3, 5.4], [12, 5.4], [12, 0.8], [19, 0.8], [19, 5.4], [24.7, 5.4], [24.7, 24.2], [6.3, 24.2]], [KR, 1, 1.8, 1.8, 1, KR, KR, KR]) + circ(15.5, 4.2, 2.2);
const BLADE = 'M18 11.4V17.6H12.4C9.6 17.6 7.4 15 7 12.6Q6.9 11.4 8 11.4Z';

export default defineIcon({
  name: 'cutting-board',
  zh: '砧板',
  category: 'home',
  tags: ['chopping board', 'knife', 'chop', 'kitchen', 'prep', 'cooking', '菜板', '切菜'],
  variants: [],
  // A paddle board with a kitchen knife lying on it; on hover the knife rocks in a chop.
  svg: (u) => `${solid(u, BOARD)}<g transform="rotate(-32 15.5 14.6)"><g data-n="kn">
      <path d="${BLADE}" fill="#fff"/><path d="${rr(17.4, 11.4, 7.2, 3.6, 1.8)}" ${DEEP}/>
    </g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.kn, { transform: `rotate(${f(rattle(clamp01(p.o), -16, 3))} 7.4 12.6)` }); }
});
