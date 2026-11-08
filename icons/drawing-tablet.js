import { defineIcon, KR, CR, f, DEEPS, WHITE, rr, poly, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { stylusShape } from './_b7-devices.js';

const TIP = [17, 16], PEN = stylusShape(0, 0, 21, 15.6, 4.2, 4.2);
const KEYS = [10.4, 14, 17.6].map((y) => rr(5.9, y, 2.4, 2.4, 0.7)).join('');

export default defineIcon({
  name: 'drawing-tablet',
  zh: '数位板',
  category: 'devices',
  tags: ['graphics tablet', 'pen tablet', 'digitizer', 'illustration', 'draw', '手绘板', '绘图板'],
  variants: ['check', 'x', 'cog'],
  // A pen tablet with shortcut keys and a stylus on its surface; on hover the stylus runs along
  // and draws out the wave.
  svg: (u) => `${back(u, rr(4, 8.2, 23, 14.6, KR))}
      <path d="${KEYS}" ${WHITE}/>
      <path d="${rr(10, 10.2, 15, 10.6, CR)}" fill="#fff"/>
      <path data-n="ink" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g data-n="pen">${front(u, PEN.barrel)}${front(u, PEN.point, u.loS)}</g>`,
  target: (h) => ({ x: h ? 4.2 : 0 }),
  draw(p, E) {
    const end = TIP[0] + p.x, pts = [];
    for (let x = 12; x < end; x += 0.6) pts.push([x, TIP[1] + 1.6 * Math.sin((x - TIP[0]) * 0.9)]);
    pts.push([end, TIP[1]]);
    at(E.ink, { d: poly(pts) });
    at(E.pen, { transform: `translate(${f(end)} ${TIP[1]})` });
  }
});
