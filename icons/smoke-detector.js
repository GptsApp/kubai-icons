import { defineIcon, f, DEEPS, WHITE, WHITES, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { arcPath, span } from './_devices.js';

const DOME = 'M8 6.8H23Q25.4 6.8 25.4 9.2V10.4C25.4 16 21.2 19.6 15.5 19.6C9.8 19.6 5.6 16 5.6 10.4V9.2Q5.6 6.8 8 6.8Z';

export default defineIcon({
  name: 'smoke-detector',
  zh: '烟雾报警器',
  category: 'home',
  tags: ['smoke alarm', 'fire alarm', 'detector', 'safety', 'ceiling', '烟感'],
  variants: ['check', 'alert'],
  // A ceiling smoke alarm; on hover its light flashes and it sounds from both sides.
  svg: (u) => `${front(u, rr(9.2, 3.8, 12.6, 4.2, 1.4))}
      ${back(u, DOME)}
      <path d="M11 11.2H20" class="ln" ${WHITES}/>
      <path data-n="led" d="${circ(15.5, 15.4, 1.3)}" ${WHITE}/>
      <path data-n="wv" d="${arcPath(15.5, 12.6, 12.6, 64, 116) + arcPath(15.5, 12.6, 12.6, 244, 296)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.led, { opacity: f(0.45 + 0.55 * span(p.o, 0, 0.25)) });
    at(E.wv, { opacity: f(span(p.o, 0.15, 0.6)) });
  }
});
