import { defineIcon, f, rp, rr, DEEPS } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Both drawn level about the origin, then crossed at 45 degrees.
const RULER = rr(-11.6, -4, 23.2, 8, 1.8), SCALE = rr(-9.6, -2, 19.2, 4, 1);
const TICKS = [-7, -3.6, 3.6, 7].map((x) => `M${x} -2V0.6`).join('');
const BODY = rr(-6.4, -3, 12.4, 6, 0.8), TIP = rp([[6, -3], [11.8, 0], [6, 3]], [0.3, 0.9, 0.3]), CAP = rr(-11, -3, 5, 6, 1.8);

export default defineIcon({
  name: 'pencil-ruler',
  zh: '铅笔和尺子',
  category: 'tools',
  tags: ['pencil', 'ruler', 'design', 'draft', 'measure', 'drawing', '制图', '设计'],
  // A pencil laid across a ruler; on hover the ruler slides along and the pencil pushes on.
  svg: (u) => rig(u, 'r', [{ d: RULER, fill: u.loS }, `<path d="${SCALE}" fill="#fff"/><path d="${TICKS}" class="ln" ${DEEPS}/>`])
    + rig(u, 'p', [{ d: CAP, fill: u.upS }, { d: BODY, fill: u.upS }, { d: TIP, fill: u.upS }]),
  target: (h) => ({ x: h ? 1.2 : 0 }),
  draw(p, E) {
    pose(E, 'r', 2, `translate(15.5 12.5) rotate(-45) translate(${f(-p.x)} 0)`);
    pose(E, 'p', 3, `translate(15.5 12.5) rotate(45) translate(${f(p.x)} 0)`);
  }
});
