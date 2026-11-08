import { defineIcon, f, rp } from '../packages/core/src/kit.js';
import { rig, pose, band } from './_tools-dev.js';

// Drawn upright with the gooseneck at the top, then leaned over.
const BAR = rp(band([[2.2, 13.4], [0, 9.6], [0, -9], [2, -13], [6.4, -13.4]], 3.4), [0.3, 1.2, 1.6, 2, 0.3, 0.3, 1, 1.4, 1.2, 0.3]);
const CLAW = rp([[5.2, -15.2], [8.6, -15], [12, -11.6], [12.2, -6.6], [9.8, -9], [7.6, -6.2], [7.4, -10], [5.2, -11.8]], [0.8, 1.6, 1, 0.3, 0.4, 0.3, 1, 0.8]);

export default defineIcon({
  name: 'crowbar',
  zh: '撬棍',
  category: 'tools',
  tags: ['pry bar', 'wrecking bar', 'lever', 'demolition', '撬杠', '撬棒'],
  // A long crowbar with a bent chisel end and a forked gooseneck; on hover it tips on its heel and lifts.
  svg: (u) => rig(u, 'b', [{ d: BAR, fill: u.loS }, { d: CLAW, fill: u.upS }]),
  target: (h) => ({ a: h ? -11 : 0, y: h ? -1.6 : 0 }),
  draw(p, E) { pose(E, 'b', 2, `translate(11.7 ${f(11.6 + p.y)}) rotate(40) rotate(${f(p.a)} 6 -13)`); }
});
