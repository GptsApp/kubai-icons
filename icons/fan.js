import { defineIcon, f, OL, DEEP, DEEPS, SOFT, rr, circ, at } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

const C = [15.5, 9.4];

export default defineIcon({
  name: 'fan',
  zh: '风扇',
  category: 'home',
  tags: ['electric fan', 'cooling', 'air', 'wind', 'ventilation', '电扇'],
  variants: ['cog', 'clock'],
  off: true,
  // A desk fan whose blades spin a full turn on hover.
  svg: (u) => {
    const head = circ(C[0], C[1], 8.2), base = rr(9.4, 20.2, 12.2, 3.2, 1.6);
    const blades = [0, 120, 240].map((a) => `<path d="${leaf([C[0], C[1]], [C[0], C[1] - 5.6], 2.6)}" transform="rotate(${a} ${C[0]} ${C[1]})" ${SOFT}/>`).join('');
    return `<path d="M15.5 16V20.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.loS}"/></g></g><path d="${base}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${head}" fill="${u.loS}"/></g></g><path d="${head}" ${OL}/>
      <path d="${circ(C[0], C[1], 6.2)}" fill="#fff"/>
      <g data-n="blades">${blades}</g>
      <circle cx="${C[0]}" cy="${C[1]}" r="1.6" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 360 : 0 }),
  draw(p, E) { at(E.blades, { transform: `rotate(${f(p.a)} ${C[0]} ${C[1]})` }); }
});
