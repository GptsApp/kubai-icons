import { defineIcon, rr, f, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const HANDLE = rr(14, 3.4, 3.2, 21, 1.6);
const HEAD = 'M18.6 3.2V9.6H13L8.2 12.2Q5.6 13.4 5 10.8Q4.2 6.4 5 2Q5.6 -0.6 8.2 0.6L13 3.2Z';

export default defineIcon({
  name: 'axe',
  zh: '斧头',
  category: 'tools',
  tags: ['chop', 'wood', 'cut', 'hatchet', '斧子'],
  // An axe; on hover it draws back, chops, and settles after a small rebound.
  svg: (u) => rig(u, 'x', [{ d: HANDLE, fill: u.loS }, { d: HEAD, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = rattle(clamp01(p.o), 13, 3);
    pose(E, 'x', 2, `translate(-1.6 0.4) rotate(${f(32 + a)} 15.6 22.6)`);
  }
});
