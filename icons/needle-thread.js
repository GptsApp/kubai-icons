import { defineIcon, f, rp, rr, DEEPS, WHITE, at } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// The needle drawn level along x, point to the left, then laid at 45 degrees.
const NEEDLE = rp([[-12.6, 0], [-2, -2], [9.6, -2], [11.6, 0], [9.6, 2], [-2, 2]], [0.3, 1, 1.8, 1.8, 1.8, 1]);
const EYE = rr(4.4, -0.9, 5, 1.8, 0.9);
const ux = Math.SQRT1_2;

export default defineIcon({
  name: 'needle-thread',
  zh: '针线',
  category: 'tools',
  tags: ['needle', 'thread', 'sewing', 'stitch', 'mend', 'craft', '缝纫', '针'],
  // A threaded sewing needle; on hover it pushes forward a stitch, drawing the thread after it.
  svg: (u) => `<path data-n="th" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`
    + rig(u, 'n', [{ d: NEEDLE, fill: u.loS }, `<path d="${EYE}" ${WHITE}/>`]),
  target: (h) => ({ s: h ? -1.8 : 0 }),
  draw(p, E) {
    pose(E, 'n', 2, `translate(15.5 12.5) rotate(-45) translate(${f(p.s)} 0)`);
    const ex = 15.5 + (7 + p.s) * ux, ey = 12.5 - (7 + p.s) * ux;
    at(E.th, { d: `M${f(ex)} ${f(ey)}C${f(ex + 4.6)} ${f(ey + 2.6)} 27 13.4 21.6 15.2C16.8 16.8 18 21.6 23.4 22.6` });
  }
});
