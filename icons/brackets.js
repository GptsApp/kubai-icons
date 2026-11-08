import { defineIcon, f, rp } from '../packages/core/src/kit.js';
import { rig, pose, band } from './_tools-dev.js';

const LEFT = band([[13, 2.8], [8.8, 2.8], [8.8, 22.2], [13, 22.2]], 2.8);
const BRACKET = rp(LEFT, [1.2, 1.2, 1.2, 1.2, 0.4, 0.4, 0.4, 0.4].map((r, i) => (i === 1 || i === 2 ? 1.6 : r)));
const MIRROR = 'translate(31 0) scale(-1 1)';

export default defineIcon({
  name: 'brackets',
  zh: '方括号',
  category: 'development',
  tags: ['square brackets', 'array', 'list', 'code', 'syntax', '数组', '括号'],
  // A pair of square brackets; on hover they open wider apart.
  svg: (u) => rig(u, 'l', [{ d: BRACKET, fill: u.loS }]) + rig(u, 'r', [{ d: BRACKET, fill: u.upS }]),
  target: (h) => ({ x: h ? 1.4 : 0 }),
  draw(p, E) {
    pose(E, 'l', 1, `translate(${f(-p.x)} 0)`);
    pose(E, 'r', 1, `translate(${f(p.x)} 0) ${MIRROR}`);
  }
});
