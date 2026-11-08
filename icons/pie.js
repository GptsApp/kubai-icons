import { defineIcon, KR, f, SOFTS, WHITES, ellipse, rp, at, clamp01 } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

const CX = 15.5, CY = 10.4;
const STEAM = 'M11.5 2.6C9.9 1.2 13.1 -0.2 11.5 -1.4M19.5 2.6C17.9 1.2 21.1 -0.2 19.5 -1.4';

export default defineIcon({
  name: 'pie',
  zh: '派',
  category: 'food',
  tags: ['dessert', 'bakery', 'lattice', 'slice', 'apple pie', 'pastry', '馅饼', '甜点'],
  variants: ['heart'],
  // A lattice pie in its tin seen from above the rim; on hover steam rises from it.
  svg: (u) => {
    const id = u.id('f'), rim = ellipse(CX, CY, 11.5, 6.6), fill = ellipse(CX, CY, 9, 4.6);
    return `<path data-n="st" d="${STEAM}" fill="none" stroke-width="2.2" stroke-linecap="round" ${SOFTS}/>
      <g data-n="p">${solid(u, rp([[5, 11], [26, 11], [22.8, 21.4], [8.2, 21.4]], [0.6, 0.6, KR, KR]))}
      ${light(u, rim)}
      <path d="${fill}" fill="${u.loS}"/>
      <clipPath id="${id}"><path d="${fill}"/></clipPath>
      <g clip-path="url(#${id})"><path d="M${CX - 3.8} 4V17M${CX + 3.8} 4V17M4 ${CY - 1.9}H27M4 ${CY + 1.9}H27" fill="none" stroke-width="2" ${WHITES}/></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.p, { transform: `translate(0 ${f(1.4 * o)})` });
    at(E.st, { transform: `translate(0 ${f(3 * (1 - o))})`, opacity: f(clamp01(o * 2)) });
  }
});
