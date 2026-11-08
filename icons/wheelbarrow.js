import { defineIcon, f, rp, circ } from '../packages/core/src/kit.js';
import { rig, pose, cwCirc } from './_tools-dev.js';
import { bar } from './_interface.js';

const AX = 8.6, AY = 19.2;
const LEG = bar(20.6, 12, 21.6, 23.2, 2.6);
const FRAME = bar(AX, AY, 28.4, 8.8, 2.8);
const WHEEL = circ(AX, AY, 4.8) + cwCirc(AX, AY, 1.5);
const TRAY = rp([[7.2, 3.3], [25.6, 3.3], [21.8, 14.8], [11.6, 14.8]], [1.4, 1.4, 2.2, 2.2]);

export default defineIcon({
  name: 'wheelbarrow',
  zh: '手推车',
  category: 'tools',
  tags: ['barrow', 'cart', 'garden', 'construction', 'haul', '独轮车', '工地'],
  // A wheelbarrow from the side; on hover its handles lift and it tips up on the wheel.
  svg: (u) => rig(u, 'b', [
    { d: LEG, fill: u.loS, sh: false },
    { d: FRAME, fill: u.loS, sh: false },
    { d: TRAY, fill: u.upS },
    { d: WHEEL, fill: u.loS }
  ]),
  target: (h) => ({ a: h ? -11 : 0 }),
  draw(p, E) { pose(E, 'b', 4, `rotate(${f(p.a)} ${AX} ${AY})`); }
});
