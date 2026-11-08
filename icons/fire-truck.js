import { defineIcon, KR, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front, wheel, turn, setD } from './_b6-vehicles.js';

const PIVOT = [5.4, 8.4], BAR = R(3.6, 2.4, 14, 6), RUNGS = [4.9, 9.2, 13.5];

export default defineIcon({
  name: 'fire-truck',
  zh: '消防车',
  category: 'transport',
  tags: ['fire engine', 'firefighter', 'emergency', 'rescue', 'ladder', '消防', '119'],
  // A fire engine with a ladder along its roof; on hover the ladder swings up from the rear.
  svg: (u) => {
    const box = rr(3.6, 8, 15.6, 10, KR), cab = rp([[17.2, 6], [24, 6], [27.4, 11], [27.4, 18], [17.2, 18]], [1.6, 1.8, 1.8, KR, 0]);
    return `<g transform="translate(0 1)">
      ${front(u, '', u.upS, 'l')}<path data-n="h" fill="#fff"/>
      ${front(u, rr(22, 3.2, 3.6, 3.6, 1.2), u.upS)}
      ${back(u, box, u.loS)}
      <path d="${rr(5.6, 10.4, 11.4, 2.4, 1.2)}" ${WHITE}/>
      ${back(u, cab, u.upS)}
      <path d="${rp([[19.4, 8.2], [23, 8.2], [25, 11.4], [19.4, 11.4]], [0.8, 0.8, 0.4, 0.6])}" fill="#fff"/>
      ${wheel(u, 8.6, 18, 2.8)}${wheel(u, 22.4, 18, 2.8)}</g>`;
  },
  target: (h) => ({ a: h ? -22 : 0 }),
  draw(p, E) {
    setD(E, 'l', rp(turn(BAR, p.a, PIVOT[0], PIVOT[1]), 1.2));
    at(E.h, { d: RUNGS.map((x) => rp(turn(R(x, 3.6, 2.8, 2.4), p.a, PIVOT[0], PIVOT[1]), 0.4)).join('') });
  }
});
