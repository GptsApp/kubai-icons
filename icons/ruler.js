import { defineIcon, KR, CR, f, rr, DEEPS } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const BODY = rr(3, 8.2, 25, 8.6, KR);
const TICKS = [7.5, 11, 14.5, 18, 21.5, 25].map((x, i) => `M${x} 11.6V${i % 2 ? 12.4 : 14}`).join('');

export default defineIcon({
  name: 'ruler',
  zh: '直尺',
  category: 'tools',
  tags: ['measure', 'length', 'scale', 'size', '尺子'],
  // A ruler with a white scale; on hover it slides along its edge as if lining up a mark.
  svg: (u) => rig(u, 'r', [
    { d: BODY, fill: u.loS },
    `<path d="${rr(5, 10.2, 21, 4.6, CR)}" fill="#fff"/><path d="${TICKS.replace('M25 11.6V12.4', '')}" class="ln" ${DEEPS}/>`
  ]),
  target: (h) => ({ x: h ? 1.6 : 0 }),
  draw(p, E) { pose(E, 'r', 2, `rotate(-45 15.5 12.5) translate(${f(p.x - 0.8)} 0)`); }
});
