import { defineIcon, KR, f, rp, rr, R, DEEPS, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const BODY = rr(8.8, 3.2, 17.8, 8.2, KR);
const GRIP = rp([[15.6, 10], [21.8, 10], [21.2, 19.4], [15, 19.4]], [0, 0, 0, 0]);
const BASE = rr(12.2, 18.2, 12.4, 5, 1.6);
const CHUCK = rp(R(4.8, 4.6, 5, 5.4), [1.4, 0.4, 0.4, 1.4]);
const BIT = rr(1.6, 6.1, 3.8, 2.4, 0.6);

export default defineIcon({
  name: 'drill',
  zh: '电钻',
  category: 'tools',
  tags: ['power drill', 'drilling', 'build', 'diy', '钻孔'],
  // A cordless drill; on hover it buzzes and the grooves on its chuck spin round.
  svg: (u) => `<clipPath id="${u.id('ch')}"><path d="${CHUCK}"/></clipPath>` + rig(u, 'd', [
    { d: BIT, fill: u.loS },
    { d: GRIP, fill: u.loS },
    { d: BODY, fill: u.loS },
    { d: BASE, fill: u.upS },
    { d: CHUCK, fill: u.upS },
    `<g clip-path="url(#${u.id('ch')})"><path data-n="gv" fill="none" stroke-width="1.6" ${DEEPS} stroke-opacity=".55"/></g>`
  ]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), y0 = 6 + 2.6 * o * 4;
    let d = '';
    for (let k = -6; k < 2; k++) { const y = y0 + k * 2.6; if (y > 3 && y < 12) d += `M5.8 ${f(y)}H8.8`; }
    E.gv.setAttribute('d', d || 'M0 0');
    pose(E, 'd', 6, `translate(${f(rattle(o, 0.5, 8))} 0)`);
  }
});
