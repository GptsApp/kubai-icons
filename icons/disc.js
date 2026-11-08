import { defineIcon, f, OL, WHITES, circ, at } from '../packages/core/src/kit.js';
import { solid, arcPath } from './_devices.js';

export default defineIcon({
  name: 'disc',
  zh: '光盘',
  category: 'devices',
  tags: ['cd', 'dvd', 'optical disc', 'album', 'music', '碟片'],
  variants: ['plus', 'check', 'x', 'down', 'up', 'lock'],
  // An optical disc with a hub and two glints; on hover it spins.
  svg: (u) => `${solid(u, circ(15.5, 12.5, 11.2) + circ(15.5, 12.5, 1.8), u.loS, { rule: 'evenodd' })}
      <g data-n="spin"><path d="${arcPath(15.5, 12.5, 7.6, 292, 336) + arcPath(15.5, 12.5, 7.6, 112, 156)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/></g>
      ${solid(u, circ(15.5, 12.5, 4.4) + circ(15.5, 12.5, 1.8), u.upS, { sh: false, rule: 'evenodd' })}`,
  target: (h) => ({ a: h ? 150 : 0 }),
  draw(p, E) { at(E.spin, { transform: `rotate(${f(p.a)} 15.5 12.5)` }); }
});
