import { defineIcon, f, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

const D = 7.2, ROT = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => [15.5 + sx * D, 12.5 + sy * D]);
// One arm along a diagonal through the centre, 3 wide; s picks the diagonal.
const arm = (s) => {
  const L = D * Math.SQRT2, w = 1.5, c = Math.SQRT1_2;
  const u = [c, s * c], n = [-s * c, c];
  const pt = (a, b) => [15.5 + u[0] * a + n[0] * b, 12.5 + u[1] * a + n[1] * b];
  return rp([pt(-L, -w), pt(L, -w), pt(L, w), pt(-L, w)], 1.5);
};

export default defineIcon({
  name: 'drone',
  zh: '无人机',
  category: 'devices',
  tags: ['quadcopter', 'uav', 'aerial', 'fly', 'camera drone', '航拍'],
  variants: ['plus', 'check', 'x', 'alert', 'cog'],
  // A quadcopter seen from above; on hover its propellers spin and it lifts off.
  svg: (u) => `<g data-n="dr">${solid(u, arm(1) + arm(-1), u.loS)}
      ${ROT.map(([x, y], i) => `${solid(u, circ(x, y, 3.3), u.upS)}<path data-n="p${i}" d="M${f(x - 2.2)} ${f(y)}H${f(x + 2.2)}" class="ln" ${DEEPS}/>`).join('')}
      ${solid(u, circ(15.5, 12.5, 3.4), u.upS)}</g>`,
  target: (h) => ({ a: h ? 180 : 45, y: h ? -0.8 : 0 }),
  draw(p, E) {
    ROT.forEach(([x, y], i) => at(E['p' + i], { transform: `rotate(${f(i % 3 ? -p.a : p.a)} ${f(x)} ${f(y)})` }));
    at(E.dr, { transform: `translate(0 ${f(p.y)})` });
  }
});
