import { defineIcon, rp, rr, f, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const SHAFT = rr(14.1, 1.6, 2.8, 14, 1);
const GRIP = rr(10.6, -0.6, 9.8, 3.6, 1.8);
const BLADE = rp([[8.8, 13], [22.2, 13], [22.2, 19.6], [15.5, 25.6], [8.8, 19.6]], [1.6, 1.6, 2.6, 1.2, 2.6]);

export default defineIcon({
  name: 'shovel',
  zh: '铲子',
  category: 'tools',
  tags: ['dig', 'spade', 'garden', 'earth', '挖掘'],
  // A spade; on hover it pushes into the ground and levers back to lift a load.
  svg: (u) => rig(u, 's', [{ d: SHAFT, fill: u.loS }, { d: GRIP, fill: u.upS }, { d: BLADE, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), push = Math.min(1, o / 0.5), lever = clamp01((o - 0.4) / 0.6);
    pose(E, 's', 3, `rotate(36 15.5 12.5) translate(0 ${f(1.4 * push - 1.4 * lever)}) rotate(${f(-12 * lever)} 15.5 19)`);
  }
});
