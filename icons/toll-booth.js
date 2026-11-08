import { defineIcon, CR, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front, turn, setD } from './_b6-vehicles.js';

const PIVOT = [16.5, 14.1], ARM = R(15, 12.6, 13, 3);
const MARKS = [19.4, 23.8].map((x) => R(x, 12.6, 2.6, 3));

export default defineIcon({
  name: 'toll-booth',
  zh: '收费站',
  category: 'transport',
  tags: ['toll', 'tollgate', 'highway', 'barrier', 'checkpoint', 'etc', '高速', '道闸'],
  // A gabled toll booth and its long striped barrier; on hover the barrier arm swings up to
  // let you through.
  svg: (u) => `${back(u, rr(3.6, 4, 9.4, 19.6, 1.4), u.loS)}
    <path d="${rr(5.6, 9.4, 5.4, 6, CR)}" fill="#fff"/>
    ${front(u, rp([[8.3, 1.2], [14, 6.8], [2.6, 6.8]], [1.4, 0.8, 0.8]), u.upS)}
    <path d="${rr(15, 14.6, 3, 9, 0.8)}" fill="${u.pure('#2F6FE0')}"/>
    ${front(u, '', u.upS, 'a')}<path data-n="m" ${DEEP}/>`,
  target: (h) => ({ a: h ? -64 : 0 }),
  draw(p, E) {
    setD(E, 'a', rp(turn(ARM, p.a, PIVOT[0], PIVOT[1]), 1.1));
    at(E.m, { d: MARKS.map((pts) => rp(turn(pts, p.a, PIVOT[0], PIVOT[1]), 0)).join('') });
  }
});
