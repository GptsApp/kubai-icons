import { defineIcon, rp, circ, f, DEEP } from '../packages/core/src/kit.js';
import { rig, cwCirc } from './_tools-dev.js';

// One half, drawn along +x with the pivot at the origin and its cutting edge facing +y.
// The blade and arm are listed counter-clockwise so they join the ring into one shape.
const BLADE = rp([[-5.15, 1.46], [-2, -1.5], [10.4, -1.5], [11.8, -0.6], [1.2, 1.5], [-3.71, 3.86]].reverse(), [0.4, 1.6, 0.8, 0.4, 1.6, 0.4].reverse());
const HALF = circ(-7, 4.2, 3.9) + BLADE + cwCirc(-7, 4.2, 2.1);

export default defineIcon({
  name: 'scissors',
  zh: '剪刀',
  category: 'tools',
  tags: ['cut', 'snip', 'trim', 'clip', '剪切'],
  // Open scissors; on hover the blades snip shut about the pivot.
  svg: (u) => rig(u, 'a', [{ d: HALF, fill: u.loS }]) + rig(u, 'b', [{ d: HALF, fill: u.upS }])
    + `<path d="${circ(15.5, 12.5, 1.3)}" ${DEEP}/>`,
  target: (h) => ({ a: h ? 7 : 24 }),
  draw(p, E) {
    const t = (s) => `translate(15.5 12.5) rotate(${f(-s * p.a)}) scale(1 ${s})`;
    pose2(E, 'a', t(1)); pose2(E, 'b', t(-1));
  }
});

function pose2(E, id, transform) {
  E[id + '0'].setAttribute('transform', transform);
  E[id + '0o'].setAttribute('transform', transform);
}
