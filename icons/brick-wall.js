import { defineIcon, KR, CR, f, OL, R, rp, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';

const WALL = rr(4, 3.3, 23, 18.4, KR);
const H = 3.87, ROW = [5.3, 5.3 + H + 1.4, 5.3 + 2 * (H + 1.4)];
const course = (y, xs) => xs.map(([a, b]) => rr(a, y, b - a, H, CR)).join('');
const FULL = [[6, 14.8], [16.2, 25]], HALF = [[3.8, 9.7], [11.1, 19.9], [21.3, 27.2]];

export default defineIcon({
  name: 'brick-wall',
  zh: '防火墙',
  category: 'security',
  tags: ['firewall', 'wall', 'bricks', 'block', 'protection', '砖墙'],
  // A brick wall in its mortar; on hover it takes a blow, the courses jolt sideways and
  // settle back in line.
  svg: (u) => `<clipPath id="${u.id('in')}"><path d="${rp(R(6, 5.3, 19, 14.4), CR)}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${WALL}" fill="${u.loS}"/></g></g>
    <path d="${WALL}" ${OL}/>
    <g clip-path="url(#${u.id('in')})" fill="#fff">
      <path data-n="c0" d="${course(ROW[0], FULL)}"/><path data-n="c1" d="${course(ROW[1], HALF)}"/><path data-n="c2" d="${course(ROW[2], FULL)}"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = rattle(clamp01(p.o), 2.6, 2);
    at(E.c0, { transform: `translate(${f(-s * 0.7)} 0)` });
    at(E.c1, { transform: `translate(${f(s)} 0)` });
    at(E.c2, { transform: `translate(${f(-s * 0.7)} 0)` });
  }
});
