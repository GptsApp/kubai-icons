import { defineIcon, f, DEEP, DEEPS, poly, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, liveFront, setPath, place } from './_b1-home.js';

const HEAD = [[-2.4, -1.4], [2.4, -1.4], [6.2, 6.6], [-6.2, 6.6]], BEAM = [[-5, 7.6], [5, 7.6], [8.4, 14.4], [-8.4, 14.4]];
const ELBOW = [6.8, 11.2];

export default defineIcon({
  name: 'desk-lamp',
  zh: '摇臂台灯',
  category: 'home',
  tags: ['light', 'task lamp', 'reading', 'study', 'adjustable', 'lighting', '台灯', '工作灯'],
  off: true,
  // A jointed desk lamp; on hover its arm lifts, its head tips down and it lights the desk.
  svg: (u) => `<path data-n="beam" data-t="fill:#D3E2FC"/>
      <path data-n="arm" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      ${back(u, rr(4.8, 20.8, 13, 3.2, 1.6))}
      <path d="${circ(...ELBOW, 2.2)}" ${DEEP}/>
      ${liveFront(u, 'head')}`,
  target: (h) => ({ a: h ? -9 : -28, y: h ? 3.4 : 4.8, g: h ? 1 : 0 }),
  draw(p, E) {
    const wx = 18.2;
    at(E.arm, { d: poly([[11.4, 21.4], ELBOW, [wx, p.y]]) });
    setPath(E, 'head', rp(place(HEAD, p.a, wx, p.y), [0.8, 0.8, 1.4, 1.4]));
    at(E.beam, { d: rp(place(BEAM, p.a, wx, p.y), 1.2), opacity: f(p.g * 0.9) });
  }
});
