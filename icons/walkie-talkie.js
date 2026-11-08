import { defineIcon, KR, CR, f, DEEPS, WHITES, rr, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { arcPath, span } from './_devices.js';

export default defineIcon({
  name: 'walkie-talkie',
  zh: '对讲机',
  category: 'devices',
  tags: ['two-way radio', 'radio', 'intercom', 'transceiver', 'talk', '无线电'],
  variants: ['check', 'x'],
  off: true,
  // A walkie-talkie with its antenna; on hover it transmits and waves spread from the antenna.
  svg: (u) => `${back(u, rr(17.4, 0.6, 3, 7.6, 1.5))}
      ${back(u, rr(8.8, 6.4, 13.4, 17.6, KR))}
      <path d="${rr(11, 8.6, 9, 4.6, CR)}" fill="#fff"/>
      <path d="M12.4 16.8H18.6M12.4 19.8H18.6" class="ln" ${WHITES}/>
      <path data-n="w1" d="${arcPath(18.9, 2.2, 4.4, 60, 120) + arcPath(18.9, 2.2, 4.4, 240, 300)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" d="${arcPath(18.9, 2.2, 7.2, 66, 114) + arcPath(18.9, 2.2, 7.2, 246, 294)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.w1, { opacity: f(span(p.o, 0, 0.45)) });
    at(E.w2, { opacity: f(span(p.o, 0.3, 0.8)) });
  }
});
