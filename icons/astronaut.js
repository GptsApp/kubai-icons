import { defineIcon, f, DEEP, rp, rr, circ, clamp01, at, rattle, R } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

const HELMET = circ(15.5, 9.8, 8.8);
const SUIT = rp(R(6, 15.8, 19, 8.2), [5, 5, 2.2, 2.2]);
const VISOR = rr(9.2, 5.4, 12.6, 8.8, 4.2);

export default defineIcon({
  name: 'astronaut',
  zh: '宇航员',
  category: 'people',
  tags: ['spaceman', 'cosmonaut', 'space suit', 'helmet', 'space', '航天员', '太空人'],
  // An astronaut in helmet and suit; on hover they drift up weightless as light slides over the visor.
  svg: (u) => `<clipPath id="${u.id('v')}"><path d="${VISOR}"/></clipPath>
    <g data-n="g">${solid(u, SUIT, u.loS)}
      ${solid(u, rr(4.6, 7, 22, 6, 2), u.loS)}
      ${solid(u, HELMET, u.upS)}
      <path d="${VISOR}" ${DEEP}/>
      <g clip-path="url(#${u.id('v')})"><path data-n="gl" d="M0 3.4H3.4L1 15.4H-2.4Z" fill="#fff"/></g>
      <path d="${rr(11.9, 20.4, 7.2, 2.6, 1)}" fill="#fff"/></g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? -0.6 : 0.2, x: h ? 19.2 : 11.6 }),
  draw(p, E) {
    at(E.g, { transform: `translate(0 ${f(p.y)}) rotate(${f(rattle(clamp01(p.o), 8, 2))} 15.5 13)` });
    at(E.gl, { transform: `translate(${f(p.x)} 0)` });
  }
});
