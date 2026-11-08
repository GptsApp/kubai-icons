import { defineIcon, f, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';
import { live, setD, solid } from './_b5-parts.js';

// Drawn upright with the flattened end on top and the cap below, then laid on a diagonal.
const TILT = 36 * Math.PI / 180;
const place = ([x, y]) => [15.5 + x * Math.cos(TILT) - y * Math.sin(TILT), 12.5 + x * Math.sin(TILT) + y * Math.cos(TILT)];
const T = -10.4, S = 5.4, N = 7;
const CRIMP = rp([[-8, T], [8, T], [7.4, T + 3.6], [-7.4, T + 3.6]].map(place), [0.9, 0.9, 0, 0]);
const CAP = [[-3.4, N - 0.2], [3.4, N - 0.2], [3.4, 10.4], [-3.4, 10.4]];
const tube = (w) => rp([[-7.8, T + 1], [7.8, T + 1], [f(6.4 - w), -2], [5, S], [3.4, N], [-3.4, N], [-5, S], [f(w - 6.4), -2]].map(place), [0, 0, 8, 1.6, 0, 0, 1.6, 8]);
const CX = 15.5 + 0.8, CY = 12.5 - 1.1;

export default defineIcon({
  name: 'ointment',
  zh: '药膏',
  category: 'health',
  tags: ['cream', 'tube', 'salve', 'balm', 'topical', 'medicine', '软膏', '乳膏'],
  variants: ['plus'],
  // A tube of ointment with a flattened end and a cap; on hover the tube is squeezed and the cap comes loose.
  svg: (u) => `<g data-n="c">${solid(u, rp(CAP.map(place), [0, 0, 1.3, 1.3]), u.upS)}</g>
    <g data-n="m">${live(u, 't', u.loS)}
    ${solid(u, CRIMP, u.upS)}
    <path d="${circ(CX, CY, 4.5)}" fill="#fff"/>
    <path d="M${CX} ${CY - 2.5}V${CY + 2.5}M${CX - 2.5} ${CY}H${CX + 2.5}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ w: h ? 1.5 : 0, y: h ? 3.2 : 0, m: h ? -1 : 0 }),
  draw(p, E) {
    setD(E, 't', tube(p.w));
    const along = (d) => `translate(${f(-Math.sin(TILT) * d)} ${f(Math.cos(TILT) * d)})`;
    at(E.c, { transform: along(p.y) });
    at(E.m, { transform: along(p.m) });
  }
});
