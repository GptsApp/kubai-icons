import { defineIcon, f, rp, capsuleRing, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const ONE = rp([[9.4, 3.3], [12.6, 3.3], [12.6, 21.7], [9.4, 21.7], [9.4, 8.4], [6.4, 9.8], [5.4, 7], [8.6, 3.3]], [1, 1, 1.2, 1.2, 0.4, 1, 1, 0.6]);
const ZERO = capsuleRing(10.4, 18.4, 3);

export default defineIcon({
  name: 'binary',
  zh: '二进制',
  category: 'development',
  tags: ['bits', 'digital', 'data', 'zero one', 'machine code', '比特'],
  // The digits 1 and 0; on hover each flips over in turn, like a bit being toggled.
  svg: (u) => rig(u, 'a', [{ d: ONE, fill: u.loS }]) + rig(u, 'b', [{ d: ZERO, fill: u.upS, rule: 'evenodd' }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const sy = (k) => { const v = Math.cos(clamp01(k) * Math.PI * 2); return f(Math.abs(v) < 0.02 ? 0.02 : v); };
    pose(E, 'a', 1, `translate(0 12.5) scale(1 ${sy(o * 1.4)}) translate(0 -12.5)`);
    pose(E, 'b', 1, `translate(21.8 12.5) scale(1 ${sy(o * 1.4 - 0.4)})`);
  }
});
