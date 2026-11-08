import { defineIcon, f, DEEP, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { arcPath, span } from './_devices.js';

export default defineIcon({
  name: 'doorbell',
  zh: '门铃',
  category: 'home',
  tags: ['doorbell', 'ring', 'bell button', 'visitor', 'door', '按门铃'],
  variants: ['check', 'x'],
  off: true,
  // A doorbell push on its plate; on hover the button is pressed and the chime rings out.
  svg: (u) => `${back(u, rr(9.4, 1.4, 12.2, 22.2, 6.1))}
      <path d="M13.4 6.4H17.6" class="ln" stroke="#fff" data-w="stroke"/>
      <path d="${circ(15.5, 15.4, 4.4)}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="bt" fill="${u.upS}"/></g><path data-n="btO" class="ol" data-t="stroke:#5393FF"/>
      <path data-n="wv" d="${arcPath(15.5, 12.5, 10.4, 52, 128) + arcPath(15.5, 12.5, 10.4, 232, 308)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const d = circ(15.5, 15.4, 2.9 - 0.5 * span(p.o, 0, 0.3) + 0.5 * span(p.o, 0.5, 1));
    at(E.bt, { d }); at(E.btO, { d });
    at(E.wv, { opacity: f(span(p.o, 0.2, 0.7)) });
  }
});
