import { defineIcon, f, rp, rr, R, at, clamp01, bump } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const TUBE = rp([[2, 11.7], [6.4, 9.9], [17, 9.9], [17, 15.1], [6.4, 15.1], [2, 13.3]], [0.5, 0.8, 0, 0, 0.8, 0.5]);
const COLLAR = rr(15.4, 7.8, 3.8, 9.4, 1.1);

export default defineIcon({
  name: 'pipette',
  zh: '取色器',
  category: 'tools',
  tags: ['eyedropper', 'color picker', 'dropper', 'sample', '吸管'],
  // An eyedropper; on hover its bulb is squeezed and released and colour is drawn up the tube.
  svg: (u) => `<clipPath id="${u.id('tube')}"><path d="${TUBE}"/></clipPath>` + rig(u, 'p', [
    { d: rr(17.6, 8.6, 11.4, 7.8, 3.9), fill: u.loS },
    { d: TUBE, fill: u.upS },
    `<g clip-path="url(#${u.id('tube')})"><path data-n="liq" fill="${u.pure('#4389FF')}"/></g>`,
    { d: COLLAR, fill: u.loS }
  ]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), sq = bump(o), hh = 7.8 - 2 * sq;
    const bulb = rr(17.6, 12.5 - hh / 2, 11.4 - 0.6 * sq, hh, hh / 2);
    at(E.p0, { d: bulb }); at(E.p0o, { d: bulb });
    at(E.liq, { d: rp(R(0, 9, 5.4 + 11 * o, 8), 0) });
    pose(E, 'p', 4, 'rotate(-45 15.5 12.5)');
  }
});
