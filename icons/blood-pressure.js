import { defineIcon, f, circ, ellipse, rr, DEEP, DEEPS, scaleAt, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const GX = 12.4, GY = 10.6, BX = 23.4, BY = 19.6;

export default defineIcon({
  name: 'blood-pressure',
  zh: '血压计',
  category: 'health',
  tags: ['blood pressure', 'sphygmomanometer', 'hypertension', 'gauge', 'vitals', '血压', '量血压'],
  // A pressure gauge with its squeeze bulb; on hover the bulb is squeezed and the needle climbs.
  svg: (u) => `<path d="M${GX} 18.6Q${GX} 22.6 16.4 22.6Q19.2 22.6 ${BX - 2} ${BY + 1}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    ${solid(u, circ(GX, GY, 8.6), u.loS)}<path d="${circ(GX, GY, 6.4)}" fill="#fff"/>
    <path data-n="nd" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path d="${circ(GX, GY, 1.5)}" ${DEEP}/>
    <g data-n="b">${solid(u, rr(BX - 1.3, BY - 6.4, 2.6, 3, 0.6), u.loS)}${solid(u, ellipse(BX, BY, 3.4, 4.2), u.upS)}</g>`,
  target: (h) => ({ a: h ? 50 : -55, s: h ? 0.84 : 1 }),
  draw(p, E) {
    const r = p.a * Math.PI / 180;
    at(E.nd, { d: `M${GX} ${GY}L${f(GX + 4.6 * Math.sin(r))} ${f(GY - 4.6 * Math.cos(r))}` });
    at(E.b, { transform: scaleAt(p.s, BX, BY, 1) });
  }
});
