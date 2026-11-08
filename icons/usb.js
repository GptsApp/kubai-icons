import { defineIcon, KR, f, OL, DEEP, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'usb',
  zh: 'U 盘',
  category: 'devices',
  tags: ['flash drive', 'thumb drive', 'usb stick', 'storage', '优盘'],
  variants: ['plus', 'check', 'x', 'alert', 'lock', 'sync', 'up', 'down'],
  // A retractable flash drive; on hover its slider pushes the connector out.
  svg: (u) => `<g data-n="plug"><g filter="${u.hi}"><path d="${rp(R(11.2, 0, 8.6, 9), [1.2, 1.2, 0, 0])}" fill="${u.upS}"/></g>
        <path d="${rp(R(11.2, 0, 8.6, 9), [1.2, 1.2, 0, 0])}" ${OL}/><path d="${rr(12.6, 1.8, 2.4, 2.4, 0.5) + rr(16, 1.8, 2.4, 2.4, 0.5)}" ${DEEP}/></g>
      ${solid(u, rr(8, 8, 15, 16, KR), u.loS)}
      <path data-n="knob" ${WHITE}/>`,
  target: (h) => ({ y: h ? 1 : 3.4 }),
  draw(p, E) {
    at(E.plug, { transform: `translate(0 ${f(p.y)})` });
    at(E.knob, { d: rr(14.2, 11 + p.y, 2.6, 6, 1.3) });
  }
});
