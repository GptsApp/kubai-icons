import { defineIcon, f, DEEPS, rp, at, scaleAt, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_interface.js';

const TIP = [7.6, 4.6];
const ARROW = rp([TIP, [26.8, 12.4], [19.2, 17], [14.8, 24]], [1.2, 1.6, 1.4, 1.6]);
// Click rays fanning out from the tip toward the upper left.
const RAYS = [180, 225, 270].map((a) => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)]);

export default defineIcon({
  name: 'cursor',
  zh: '指针',
  category: 'interface',
  tags: ['mouse', 'pointer', 'arrow', 'click', 'select', '光标'],
  // A mouse pointer that clicks on hover: it dips toward its tip and rays spring out.
  svg: (u) => `<g data-n="arrow">${back(u, ARROW)}</g>
    <path data-n="rays" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), r0 = 3 + 0.4 * o, r1 = r0 + 2.4 * o;
    at(E.arrow, { transform: scaleAt(1 - 0.06 * o, TIP[0], TIP[1]) });
    at(E.rays, {
      d: RAYS.map(([x, y]) => `M${f(TIP[0] + x * r0)} ${f(TIP[1] + y * r0)}L${f(TIP[0] + x * r1)} ${f(TIP[1] + y * r1)}`).join(''),
      opacity: o < 0.02 ? 0 : 1
    });
  }
});
