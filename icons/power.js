import { defineIcon, f, OL, DEEPS, WHITES, circ, at, scaleAt } from '../packages/core/src/kit.js';
import { span, solid, arcPath } from './_devices.js';

export default defineIcon({
  name: 'power',
  zh: '电源',
  category: 'devices',
  tags: ['power button', 'on', 'off', 'shutdown', 'switch', '开关机'],
  variants: ['clock'],
  // A round power button; on hover it is pressed in and lights up.
  svg: (u) => {
    const face = circ(15.5, 12.5, 7.8);
    const glyph = `${arcPath(15.5, 13, 4.2, 48, 312)}M15.5 7.6V12.2`;
    return `${solid(u, circ(15.5, 12.5, 11), u.loS)}
      <g data-n="face"><g filter="${u.hi}"><path d="${face}" fill="${u.upS}"/><path data-n="lit" d="${face}" fill="${u.pure('#4389FF')}"/></g><path d="${face}" ${OL}/>
        <path data-n="gD" d="${glyph}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
        <path data-n="gW" d="${glyph}" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.face, { transform: scaleAt(1 - 0.08 * p.o, 15.5, 12.5) });
    at(E.lit, { opacity: f(p.o) }); at(E.gW, { opacity: f(span(p.o, 0.2, 0.75)) }); at(E.gD, { opacity: f(1 - span(p.o, 0.45, 1)) });
  }
});
