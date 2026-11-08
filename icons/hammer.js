import { defineIcon, rp, rr, f, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const HANDLE = rr(13.8, 7, 3.4, 17, 1.7);
const HEAD = rp([[5.2, 2], [19.4, 2], [25.8, 4.1], [25.8, 6.5], [19.4, 8.6], [5.2, 8.6]], [1.6, 1, 0.6, 0.6, 1, 1.6]);

export default defineIcon({
  name: 'hammer',
  zh: '锤子',
  category: 'tools',
  tags: ['build', 'repair', 'construct', 'nail', '工具'],
  // A claw hammer; on hover it swings back, strikes, and settles after a small rebound.
  svg: (u) => rig(u, 'h', [{ d: HANDLE, fill: u.loS }, { d: HEAD, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = rattle(clamp01(p.o), 14, 3);
    pose(E, 'h', 2, `rotate(-40 15.5 12.5) rotate(${f(a)} 15.5 23)`);
  }
});
