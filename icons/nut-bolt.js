import { defineIcon, f, rr, WHITES } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Drawn level along x, head to the left, then laid at 45 degrees.
const SHANK = rr(-8.4, -2.6, 20, 5.2, 1.2), HEAD = rr(-11.6, -5.4, 4.4, 10.8, 1.4), NUT = rr(0, -4.6, 4.6, 9.2, 1.2);
const THREAD = [4.6, 7.4, 10.2].map((x) => `M${x - 0.6} -1.4L${x + 0.6} 1.4`).join('');
const PLACE = 'rotate(-45 15.5 12.5) translate(15.5 12.5)';

export default defineIcon({
  name: 'nut-bolt',
  zh: '螺栓螺母',
  category: 'tools',
  tags: ['bolt', 'nut', 'screw', 'hardware', 'fastener', 'assemble', '螺丝', '五金'],
  // A bolt with a nut on its thread; on hover the nut is screwed up toward the head.
  svg: (u) => rig(u, 'b', [{ d: SHANK, fill: u.loS }, `<path d="${THREAD}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`, { d: HEAD, fill: u.upS }])
    + rig(u, 'n', [{ d: NUT, fill: u.upS }]),
  target: (h) => ({ x: h ? -3.6 : 0 }),
  draw(p, E) {
    pose(E, 'b', 3, PLACE);
    pose(E, 'n', 1, `${PLACE} translate(${f(p.x)} 0)`);
  }
});
