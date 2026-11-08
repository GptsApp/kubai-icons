import { defineIcon, rp, rr, f, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const FRAME = rp([[9.6, 3.4], [21.4, 3.4], [17.3, 17.2], [17.3, 22.4], [13.7, 22.4], [13.7, 17.2]], [1, 1, 1.2, 0.6, 0.6, 1.2])
  + rp([[12.6, 5.8], [18.4, 5.8], [16, 13.8], [15, 13.8]], [0.6, 0.6, 0.6, 0.6]);
const PAD = rr(7.8, 1.2, 15.4, 3.8, 1.9), GRIP = rr(10.8, 9.2, 9.4, 2.8, 1.4), TIP = rr(13, 21.2, 5, 2.8, 1.2);

export default defineIcon({
  name: 'crutch',
  zh: '拐杖',
  category: 'health',
  tags: ['crutch', 'injury', 'mobility', 'recovery', 'support', 'disability', '康复', '腋杖'],
  // An underarm crutch; on hover it swings forward on its tip for a step and settles.
  svg: (u) => rig(u, 'c', [{ d: FRAME, fill: u.loS, rule: 'evenodd' }, { d: GRIP, fill: u.upS }, { d: PAD, fill: u.upS }, { d: TIP, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { pose(E, 'c', 4, `rotate(${f(-12 + rattle(clamp01(p.o), 14, 2))} 15.5 13)`); }
});
