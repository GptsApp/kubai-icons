import { defineIcon, f, OL, DEEPS, WHITE, WHITES, at } from '../packages/core/src/kit.js';
import { PLANE_SIDE } from './_travel-transport.js';

// The pass and its stub meet at the perforation x=20.6, notched at the top and bottom.
const MAIN = 'M6 4.4H19A1.6 1.6 0 0 0 20.6 6V19A1.6 1.6 0 0 0 19 20.6H6Q3.8 20.6 3.8 18.4V6.6Q3.8 4.4 6 4.4Z';
const STUB = 'M20.6 6A1.6 1.6 0 0 0 22.2 4.4H25Q27.2 4.4 27.2 6.6V18.4Q27.2 20.6 25 20.6H22.2A1.6 1.6 0 0 0 20.6 19Z';

export default defineIcon({
  name: 'boarding-pass',
  zh: '登机牌',
  category: 'travel',
  tags: ['boarding pass', 'flight', 'ticket', 'airport', 'check-in', 'airline', '机票', '值机'],
  variants: ['plus', 'check', 'x', 'clock'],
  // A boarding pass with a plane on it and a stub; on hover the stub starts to tear away.
  svg: (u) => `<g data-n="m"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${MAIN}" fill="${u.loS}"/></g></g><path d="${MAIN}" ${OL}/>
      <g transform="translate(12.2 9.8) scale(0.4)"><path d="${PLANE_SIDE.body + PLANE_SIDE.wing}" ${WHITE}/></g>
      <path d="M7 16.4H17.4" class="ln" stroke-linecap="round" ${WHITES}/></g>
    <g data-n="s"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${STUB}" fill="${u.upS}"/></g></g><path d="${STUB}" ${OL}/>
      <path d="M22.8 10H25M22.8 13H25" class="ln" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ m: h ? -0.8 : 0, s: h ? [0.6, 9] : [0, 0] }),
  draw(p, E) {
    at(E.m, { transform: `translate(${f(p.m)} 0)` });
    at(E.s, { transform: `translate(${f(p.s[0])} 0) rotate(${f(p.s[1])} 20.6 20.6)` });
  }
});
