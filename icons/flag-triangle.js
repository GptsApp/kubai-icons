import { defineIcon, f, OL, DEEPS, at, clamp01, rattle } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'flag-triangle',
  zh: '三角旗',
  category: 'interface',
  tags: ['pennant', 'flag', 'marker', 'milestone', 'goal', 'report', '旗子'],
  // A triangular pennant on a pole; on hover it flutters in the wind and comes to rest.
  svg: (u) => `<path d="M8.2 2.4V23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cl" fill="${u.loS}"/></g></g><path data-n="clO" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The pennant's edges bow with a damped flutter and its tip bobs, both 0 at rest and at the end.
    const o = clamp01(p.o), a = rattle(o, 2.4, 3), ty = 9.5 + a * 0.5;
    const d = `M9.2 3.4Q17.1 ${f(6.45 + a)} 24 ${f(ty - 0.6)}Q25.4 ${f(ty)} 24 ${f(ty + 0.6)}Q17.1 ${f(12.55 + a)} 9.2 15.6Z`;
    at(E.cl, { d }); at(E.clO, { d });
  }
});
