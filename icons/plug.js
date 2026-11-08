import { defineIcon, KR, f, DEEP, DEEPS, WHITE, rp, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'plug',
  zh: '插头',
  category: 'devices',
  tags: ['power', 'electric', 'connect', 'charge', 'socket', '电源'],
  variants: ['check', 'x', 'alert', 'bolt'],
  off: true,
  // A mains plug on its cable; on hover it pushes up as if into a socket and powers on.
  svg: (u) => {
    const head = rp([[7.8, 7.4], [23.2, 7.4], [23.2, 12.2], [19.4, 18.6], [11.6, 18.6], [7.8, 12.2]], [KR, KR, 2.4, 1.6, 1.6, 2.4]);
    const bolt = rp([[16.6, 9.8], [12.8, 13.8], [15.2, 13.8], [14.4, 16.6], [18.2, 12.6], [15.8, 12.6]], 0.4);
    return `<path data-n="cord" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="plug"><path d="${rr(11.3, 2.4, 2.6, 6.4, 1) + rr(17.1, 2.4, 2.6, 6.4, 1)}" ${DEEP}/>
        ${solid(u, head, u.loS)}<path data-n="bolt" d="${bolt}" ${WHITE}/></g>`;
  },
  target: (h) => ({ y: h ? -1.6 : 0, b: h ? 1 : 0.7 }),
  draw(p, E) {
    at(E.plug, { transform: `translate(0 ${f(p.y)})` });
    at(E.cord, { d: `M15.5 ${f(18 + p.y)}V23.6` });
    at(E.bolt, { opacity: f(p.b) });
  }
});
