import { defineIcon, f, rp, rr, DEEPS, WHITES, clamp01, bump } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Drawn level along x, blade tip to the left, then laid at 45 degrees.
const BLADE = rp([[-13.8, 0], [-3.4, -7.6], [1.6, 0], [-3.4, 7.6]], [0.8, 2, 1.2, 2]);
const HANDLE = rr(3.8, -2.7, 9.2, 5.4, 2.7);

export default defineIcon({
  name: 'trowel',
  zh: '抹刀',
  category: 'tools',
  tags: ['trowel', 'masonry', 'plaster', 'cement', 'build', 'construction', '泥刀', '瓦刀'],
  // A pointing trowel; on hover it sweeps across as if spreading mortar and comes to rest.
  svg: (u) => rig(u, 't', [`<path d="M0 0H5" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
    { d: BLADE, fill: u.loS }, `<path d="M-9.4 0H-2" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`,
    { d: HANDLE, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = 18 * bump(o) * (1 - o * 0.4), x = -1.2 * o;
    pose(E, 't', 4, `translate(15.5 12.5) rotate(${f(-45 + a)}) translate(${f(x)} 0)`);
  }
});
