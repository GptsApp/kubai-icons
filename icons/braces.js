import { defineIcon, f, rp } from '../packages/core/src/kit.js';
import { rig, pose, band } from './_tools-dev.js';

const LEFT = band([[12.8, 2.2], [10.6, 2.2], [9.8, 3.2], [9.8, 10.4], [6.6, 12.5], [9.8, 14.6], [9.8, 21.8], [10.6, 22.8], [12.8, 22.8]], 2.8);
const BRACE = rp(LEFT, LEFT.map((_, i) => (i === 0 || i === 8 || i === 9 || i === 17 ? 1.2 : i === 4 || i === 13 ? 0.6 : 1)));
const MIRROR = 'translate(31 0) scale(-1 1)';

export default defineIcon({
  name: 'braces',
  zh: '花括号',
  category: 'development',
  tags: ['curly braces', 'json', 'object', 'code', 'syntax', '括号'],
  // A pair of curly braces; on hover they open wider apart.
  svg: (u) => rig(u, 'l', [{ d: BRACE, fill: u.loS }]) + rig(u, 'r', [{ d: BRACE, fill: u.upS }]),
  target: (h) => ({ x: h ? 1.4 : 0 }),
  draw(p, E) {
    pose(E, 'l', 1, `translate(${f(-p.x)} 0)`);
    pose(E, 'r', 1, `translate(${f(p.x)} 0) ${MIRROR}`);
  }
});
