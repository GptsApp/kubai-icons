import { defineIcon, f, rp, rr, at, WHITES, DEEP } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const CX = 15.5, CORE = 2.8, P = 4.6;
const right = [], left = [];
[6.6, 6, 4.8].forEach((w, k) => right.push([CX + CORE, 6.4 + P * k], [CX + w, 8.2 + P * k]));
[6.6, 5.6].forEach((w, k) => left.push([CX - CORE, 8.7 + P * k], [CX - w, 10.5 + P * k]));
const SHANK = rp([...right, [CX + 2.2, 20], [CX, 24.4], [CX - 2.2, 20], ...left.reverse()], 0.5);
const HEAD = rp([[CX - 8, 6.8], [CX - 8, 3.8], [CX - 4.4, 1], [CX + 4.4, 1], [CX + 8, 3.8], [CX + 8, 6.8]], [1.2, 1.6, 1.6, 1.6, 1.6, 1.2]);

export default defineIcon({
  name: 'screw',
  zh: '螺丝',
  category: 'tools',
  tags: ['bolt', 'fastener', 'thread', 'hardware', 'fix', '螺钉'],
  // A threaded wood screw; on hover it turns, its thread runs down and it sinks in.
  svg: (u) => `<g data-n="s">${solid(u, SHANK, u.loS)}
    <clipPath id="${u.id('t')}"><path d="M12.7 7H18.3V19H12.7Z"/></clipPath>
    <g clip-path="url(#${u.id('t')})"><path data-n="th" fill="none" stroke-width="1.6" ${WHITES}/></g>
    ${solid(u, HEAD, u.upS)}
    <path data-n="slot" d="${rr(14.2, 1, 2.6, 3.2, 0.5)}" ${DEEP}/></g>`,
  target: (h) => ({ t: h ? 1 : 0 }),
  draw(p, E) {
    let d = '';
    for (let k = -1; k < 3; k++) { const y = 10.6 + P * (k + p.t); d += `M12.7 ${f(y + 1.3)}L18.3 ${f(y - 1.3)}`; }
    at(E.th, { d });
    at(E.s, { transform: `translate(0 ${f(1.4 * p.t)})` });
    at(E.slot, { transform: `translate(15.5 0) scale(${f(Math.max(0.05, Math.abs(Math.cos(p.t * Math.PI))))} 1) translate(-15.5 0)` });
  }
});
