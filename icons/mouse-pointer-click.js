import { defineIcon, f, DEEPS, rp, at, scaleAt, clamp01, bump } from '../packages/core/src/kit.js';
import { back } from './_interface.js';

const TIP = [9.6, 6.6];
const ARROW = rp([TIP, [27, 13.8], [20.2, 17.8], [16.2, 24.2]], [1.2, 1.6, 1.4, 1.6]);
// Click rays fanning out from the tip toward the upper left.
const RAYS = [180, 225, 270].map((a) => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)]);

export default defineIcon({
  name: 'mouse-pointer-click',
  zh: '点击',
  category: 'interface',
  tags: ['click', 'mouse', 'pointer', 'cursor', 'press', 'select', 'tap', '鼠标点击'],
  // A mouse pointer clicking, with rays at its tip; on hover it clicks again: it dips and the rays spring out further.
  svg: (u) => `<g data-n="arrow">${back(u, ARROW)}</g>
    <path data-n="rays" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), s = bump(o), r0 = 3.2 + 0.4 * s, r1 = r0 + 2.6 + 1 * s;
    at(E.arrow, { transform: scaleAt(1 - 0.08 * s, TIP[0], TIP[1]) });
    at(E.rays, { d: RAYS.map(([x, y]) => `M${f(TIP[0] + x * r0)} ${f(TIP[1] + y * r0)}L${f(TIP[0] + x * r1)} ${f(TIP[1] + y * r1)}`).join('') });
  }
});
