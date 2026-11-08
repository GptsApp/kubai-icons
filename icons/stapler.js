import { defineIcon, f, rp, rr, circ, DEEP } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';
import { solid } from './_w2-dev.js';

const BASE = rr(3.6, 17.4, 23.8, 4.3, 2);
const ARM = rp([[3.6, 9.8], [23.4, 4], [27.4, 5.2], [27.4, 12.2], [8, 16.2], [3.6, 18]], [1.8, 1.6, 2, 1.4, 1.6, 1.2]);

export default defineIcon({
  name: 'stapler',
  zh: '订书机',
  category: 'files',
  tags: ['staple', 'office', 'bind', 'paper', 'desk', '装订', '办公'],
  // A desk stapler; on hover the arm is pressed down about its hinge onto the base.
  svg: (u) => solid(u, BASE, u.loS) + rig(u, 'a', [{ d: ARM, fill: u.upS }])
    + `<path d="${circ(7.4, 14, 1.5)}" ${DEEP}/>`,
  target: (h) => ({ a: h ? 13 : 0 }),
  draw(p, E) { pose(E, 'a', 1, `rotate(${f(p.a)} 7.4 14)`); }
});
