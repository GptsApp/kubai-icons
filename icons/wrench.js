import { defineIcon, rr, f } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Head ring and its open jaw, drawn level and turned to the diagonal.
const HX = 21.6, HR = 6, W = 2.4, TIP = HX + Math.sqrt(HR * HR - W * W);
const HEAD = `M${f(TIP)} ${f(12.5 - W)}H22.4Q21.8 ${f(12.5 - W)} 21.8 ${f(12.5 - W + 0.6)}V${f(12.5 + W - 0.6)}Q21.8 ${f(12.5 + W)} 22.4 ${f(12.5 + W)}H${f(TIP)}A${HR} ${HR} 0 1 1 ${f(TIP)} ${f(12.5 - W)}Z`;
const HANDLE = rr(2.6, 10.1, 15, 4.8, 2.4);

export default defineIcon({
  name: 'wrench',
  zh: '扳手',
  category: 'tools',
  tags: ['spanner', 'repair', 'fix', 'maintenance', '维修'],
  // An open-end wrench; on hover it turns about the nut held in its jaw.
  svg: (u) => rig(u, 'w', [{ d: HANDLE, fill: u.loS }, { d: HEAD, fill: u.upS }]),
  target: (h) => ({ a: h ? -24 : 0 }),
  draw(p, E) {
    pose(E, 'w', 2, `rotate(-45 15.5 12.5) rotate(${f(p.a)} 24.4 12.5)`);
  }
});
