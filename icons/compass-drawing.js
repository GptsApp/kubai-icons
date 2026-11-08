import { defineIcon, f, rp, rr, circ, DEEP, DEEPS } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Each leg hangs from the hinge at the origin.
const LEG = rr(-1.8, 0, 3.6, 15.6, 1.6);
const NEEDLE = `<path d="M0 15V19.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`;
const NIB = rp([[-1.8, 14.8], [1.8, 14.8], [0, 19.6]], [0.3, 0.3, 0.5]);
const HX = 15.5, HY = 4.6;

export default defineIcon({
  name: 'compass-drawing',
  zh: '圆规',
  category: 'tools',
  tags: ['drafting compass', 'compass', 'geometry', 'circle', 'drawing', 'math', '画圆', '几何'],
  // A drafting compass, needle leg and pencil leg; on hover its legs open wider.
  svg: (u) => `<path d="M${HX} 0V2.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`
    + rig(u, 'a', [NEEDLE, { d: LEG, fill: u.loS }])
    + rig(u, 'b', [{ d: NIB, fill: u.upS }, `<path d="${rp([[-0.8, 17.4], [0.8, 17.4], [0, 19.6]], 0.2)}" ${DEEP}/>`, { d: LEG, fill: u.loS }])
    + rig(u, 'h', [{ d: circ(HX, HY, 3.8), fill: u.upS }, `<path d="${circ(HX, HY, 1.3)}" ${DEEP}/>`]),
  target: (h) => ({ a: h ? 27 : 18 }),
  draw(p, E) {
    pose(E, 'a', 2, `translate(${HX} ${HY}) rotate(${f(p.a)})`);
    pose(E, 'b', 3, `translate(${HX} ${HY}) rotate(${f(-p.a)})`);
  }
});
