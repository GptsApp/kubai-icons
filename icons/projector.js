import { defineIcon, KR, f, OL, DEEP, WHITE, WHITES, lines, rr, circ, at } from '../packages/core/src/kit.js';
import { span, solid } from './_devices.js';

export default defineIcon({
  name: 'projector',
  zh: '投影仪',
  category: 'devices',
  tags: ['beamer', 'presentation', 'present', 'slides', 'cinema', '投影'],
  variants: ['plus', 'check', 'x', 'cog'],
  // A projector on two feet with a lens and vents; on hover the lens lights up and extends as it
  // focuses.
  svg: (u) => {
    const lens = circ(10.8, 13.2, 3.6);
    return `<path d="${rr(6.8, 17.4, 3, 5.4, 1) + rr(21.2, 17.4, 3, 5.4, 1)}" ${DEEP}/>
      ${solid(u, rr(4, 6.4, 23, 13.6, KR), u.loS)}
      <path d="${lines(17.4, 11.7, [6.6, 6.6])}" class="ln" ${WHITES}/>
      <g filter="${u.hi}"><path data-n="lu" d="${lens}" fill="${u.upS}"/><path data-n="lit" d="${lens}" fill="${u.pure('#4389FF')}"/></g><path data-n="lo" d="${lens}" ${OL}/>
      <circle data-n="iD" cx="10.8" cy="13.2" ${DEEP}/><circle data-n="iW" cx="10.8" cy="13.2" ${WHITE}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const r = f(1.6 + 0.5 * p.o);
    const lens = circ(10.8, 13.2, 3.6 + 0.7 * p.o);
    at(E.lu, { d: lens }); at(E.lo, { d: lens });
    at(E.lit, { d: lens, opacity: f(p.o) });
    at(E.iD, { r, opacity: f(1 - span(p.o, 0.45, 1)) }); at(E.iW, { r, opacity: f(span(p.o, 0.2, 0.75)) });
  }
});
