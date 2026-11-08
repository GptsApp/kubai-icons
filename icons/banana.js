import { defineIcon, f, OL, DEEP, DEEPS, at, rattle, clamp01 } from '../packages/core/src/kit.js';

// A crescent between two arcs that share the stem end and the tip.
const P1 = [24.4, 2.6], P2 = [4, 18.2];
const moon = (ro, ri) => `M${P1[0]} ${P1[1]}A${ro} ${ro} 0 0 1 ${P2[0]} ${P2[1]}A${ri} ${ri} 0 0 0 ${P1[0]} ${P1[1]}Z`;
const BODY = moon(13.2, 22), FACE = moon(15, 22);

export default defineIcon({
  name: 'banana',
  zh: '香蕉',
  category: 'food',
  tags: ['fruit', 'snack', 'potassium', 'healthy', 'tropical', '水果'],
  variants: [],
  // A curved banana lying on its back; it rocks on its belly on hover.
  svg: (u) => `<g data-n="g">
      <path d="M24.2 3L25.8 0.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL} stroke-linejoin="round"/>
      <g filter="${u.hi}"><path d="${FACE}" fill="${u.upS}"/></g>
      <circle cx="${f(P2[0] + 1)}" cy="${f(P2[1] - 0.2)}" r="1.2" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 8, 2))} 15.5 21)` }); }
});
