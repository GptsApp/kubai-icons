import { defineIcon, f, rp, circ, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// A hand saw: a tapering toothed blade and a handle with a grip hole.
const teeth = [];
for (let x = 21.4; x > 4; x -= 2.6) teeth.push([x, 17.2], [x - 1.3, 19.6]);
const BLADE = rp([[3, 13.8], [23.4, 8.4], [23.4, 17.2], ...teeth, [3, 17.2]], 0.3);
const HANDLE = rp([[22.4, 7.4], [28.4, 7.4], [28.4, 19.4], [22.4, 19.4]], [2.4, 2.4, 2.4, 2.4]) + circ(25.4, 13.4, 2.2);

export default defineIcon({
  name: 'saw',
  zh: '锯子',
  category: 'tools',
  tags: ['handsaw', 'cut', 'wood', 'carpentry', '木工'],
  // A hand saw; on hover it saws back and forth and comes to rest.
  svg: (u) => rig(u, 's', [{ d: BLADE, fill: u.loS }, { d: HANDLE, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { pose(E, 's', 2, `rotate(-20 15.5 13) translate(${f(rattle(clamp01(p.o), 1.6, 4) - 0.6)} 0)`); }
});
