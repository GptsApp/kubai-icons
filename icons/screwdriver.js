import { defineIcon, rp, rr, f, DEEPS } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const GRIP = rr(1.6, 8.4, 10.8, 8.2, 3.2);
const SHAFT = rp([[11, 11.1], [25.4, 11.1], [29, 11.8], [29, 13.2], [25.4, 13.9], [11, 13.9]], [0.3, 0.4, 0.3, 0.3, 0.4, 0.3]);

export default defineIcon({
  name: 'screwdriver',
  zh: '螺丝刀',
  category: 'tools',
  tags: ['screw', 'repair', 'fix', 'assemble', '起子'],
  // A screwdriver; on hover it pushes in and the grooves on its grip roll past as it turns.
  svg: (u) => `<clipPath id="${u.id('grip')}"><path d="${GRIP}"/></clipPath>` + rig(u, 's', [
    { d: SHAFT, fill: u.loS },
    { d: GRIP, fill: u.upS },
    `<g clip-path="url(#${u.id('grip')})"><path data-n="gv" fill="none" stroke-width="1.6" ${DEEPS} stroke-opacity=".55"/></g>`
  ]),
  target: (h) => ({ x: h ? 1.4 : 0, g: h ? 3 : 0 }),
  draw(p, E) {
    const y0 = 11 + p.g;
    let d = '';
    for (let k = -1; k < 2; k++) d += `M4.2 ${f(y0 + k * 3)}H10`;
    E.gv.setAttribute('d', d);
    pose(E, 's', 3, `rotate(135 15.5 12.5) translate(${f(p.x)} 0)`);
  }
});
