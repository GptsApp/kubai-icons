import { defineIcon, f, OL, R, rp, rr, WHITE, WHITES } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const NIB = rp([[10.2, 8.4], [20.8, 8.4], [23.6, 14.6], [15.5, 24.2], [7.4, 14.6]], [1, 1, 1.8, 0.6, 1.8]);
const COLLAR = rp(R(10, 2.4, 11, 6.8), [1.8, 1.8, 1.2, 1.2]);

export default defineIcon({
  name: 'pen-tool',
  zh: '钢笔工具',
  category: 'tools',
  tags: ['bezier', 'vector', 'path', 'design', 'nib', '矢量'],
  // A vector pen nib with its slit and breather hole; on hover it presses down and the slit opens.
  svg: (u) => rig(u, 'n', [
    { d: NIB, fill: u.loS },
    `<circle cx="15.5" cy="15.2" r="1.8" ${WHITE}/><path data-n="sl" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`,
    { d: COLLAR, fill: u.upS }
  ]),
  target: (h) => ({ y: h ? 1.2 : 0, s: h ? 1 : 0 }),
  draw(p, E) {
    pose(E, 'n', 3, `translate(0 ${f(p.y)})`);
    E.sl.setAttribute('d', `M${f(15.5 - 0.5 * p.s)} 21.2L15.5 17.6L${f(15.5 + 0.5 * p.s)} 21.2`);
  }
});
