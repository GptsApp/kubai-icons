import { defineIcon, KR, f, OL, DEEPS, WHITE, rr, circ, at } from '../packages/core/src/kit.js';
import { solid, arcPath, span } from './_devices.js';

export default defineIcon({
  name: 'router',
  zh: '路由器',
  category: 'devices',
  tags: ['wifi', 'network', 'internet', 'modem', 'wireless', '网络'],
  variants: ['check', 'x', 'alert', 'lock', 'cog', 'sync'],
  off: true,
  // A router with two antennas; on hover its signal waves light up from the inside out.
  svg: (u) => `${solid(u, rr(5.4, 3, 2.6, 10, 1.3), u.upS, { sh: false })}${solid(u, rr(23, 3, 2.6, 10, 1.3), u.upS, { sh: false })}
      ${solid(u, rr(4, 11.4, 23, 10.4, KR), u.loS)}
      <path d="${circ(9, 16.6, 1.3) + circ(13, 16.6, 1.3) + circ(17, 16.6, 1.3)}" ${WHITE}/>
      <path data-n="w1" d="${arcPath(15.5, 10.2, 2.8, -45, 45)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" d="${arcPath(15.5, 10.2, 5.8, -45, 45)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.w1, { opacity: f(0.3 + 0.7 * span(p.o, 0, 0.5)) });
    at(E.w2, { opacity: f(0.3 + 0.7 * span(p.o, 0.35, 0.85)) });
  }
});
