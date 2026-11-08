import { defineIcon, f, OL, DEEPS, circ, ellipse, at, clamp01, rattle } from '../packages/core/src/kit.js';

// Leg roots sit under the shell; each leg swings about its root.
const LEGS = [[10, 11.6, 5.8, 9.4], [9.4, 15.4, 4.8, 15.4], [10, 19.2, 5.8, 21.6]];

export default defineIcon({
  name: 'bug',
  zh: '缺陷',
  category: 'development',
  tags: ['bug', 'debug', 'issue', 'error', 'beetle', '调试'],
  // A beetle; on hover its legs scuttle and it settles again.
  svg: (u) => `<g data-n="lg" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}>
      ${LEGS.map((l, i) => `<path data-n="l${i}" d="M${l[0]} ${l[1]}L${l[2]} ${l[3]}"/><path data-n="r${i}" d="M${f(31 - l[0])} ${l[1]}L${f(31 - l[2])} ${l[3]}"/>`).join('')}
      <path d="M13.6 4L11.6 1.4M17.4 4L19.4 1.4"/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 7.2, 4)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 7.2, 4)}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${ellipse(15.5, 15.4, 6.6, 7.6)}" fill="${u.upS}"/></g></g><path d="${ellipse(15.5, 15.4, 6.6, 7.6)}" ${OL}/>
    <path d="M15.5 11V20.4" class="ln" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    LEGS.forEach((l, i) => {
      const a = rattle(o, 16, 3) * (i % 2 ? -1 : 1);
      at(E['l' + i], { transform: `rotate(${f(a)} ${l[0]} ${l[1]})` });
      at(E['r' + i], { transform: `rotate(${f(a)} ${f(31 - l[0])} ${l[1]})` });
    });
  }
});
