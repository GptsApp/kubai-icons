import { defineIcon, f, rp, rr, clamp01, rattle, DEEP } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Drawn level with the cutting edge to the left, then laid on the diagonal. The blade keeps
// one width and ends in a single slanted bevel.
const BLADE = rp([[-12.6, -3], [1.4, -3], [1.4, 3], [-7.6, 3]], [0.5, 0.6, 0.6, 0.5]);
const BEVEL = rp([[-12.6, -3], [-9, -3], [-4, 3], [-7.6, 3]], 0.5);
const HANDLE = rr(3.4, -4.2, 11.4, 8.4, 3.4);

export default defineIcon({
  name: 'chisel',
  zh: '凿子',
  category: 'tools',
  tags: ['carve', 'woodwork', 'carpentry', 'wood', 'cut', '木工', '雕刻'],
  // A wood chisel with an even blade and a single slanted bevel; on hover it is struck forward into the work.
  svg: (u) => rig(u, 'c', [
    { d: BLADE, fill: u.loS },
    { d: BEVEL, fill: u.upS, sh: false },
    `<path d="${rr(0.8, -3.4, 3.2, 6.8, 0.8)}" ${DEEP}/>`,
    { d: HANDLE, fill: u.upS }
  ]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = -3 * o + rattle(o, 5, 3);
    pose(E, 'c', 4, `translate(16.2 11.8) rotate(-45) translate(${f(x)} 0)`);
  }
});
