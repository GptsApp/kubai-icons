import { defineIcon, f, rp, rr, clamp01, rattle } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Drawn level with the point to the left, then laid on the diagonal.
const SHAFT = rp([[-15, 0], [-10.4, -2], [11, -2], [11, 2], [-10.4, 2]], [0.4, 0.5, 0, 0, 0.5]);
const HEAD = rr(10, -6.6, 4.4, 13.2, 2.2);

export default defineIcon({
  name: 'nail',
  zh: '钉子',
  category: 'tools',
  tags: ['hammer', 'fasten', 'carpentry', 'hardware', 'pin', '铁钉'],
  // A nail; on hover it is struck and driven forward along its length.
  svg: (u) => rig(u, 'n', [{ d: SHAFT, fill: u.loS }, { d: HEAD, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = -2.2 * o + rattle(o, 1.1, 2);
    pose(E, 'n', 2, `translate(15.5 12.5) rotate(-45) translate(${f(x)} 0)`);
  }
});
