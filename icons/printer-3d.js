import { defineIcon, KR, CR, f, DEEP, DEEPS, SOFT, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'printer-3d',
  zh: '3D 打印机',
  category: 'devices',
  tags: ['3d printer', 'additive', 'fabrication', 'maker', 'print', '三维打印'],
  variants: ['check', 'x', 'clock', 'cog'],
  // A 3D printer in its frame; on hover the nozzle moves to and fro as the part grows layer by layer.
  svg: (u) => `${back(u, rr(4.6, 1.8, 21.8, 21.2, KR))}
      <path d="${rr(7.2, 4.4, 16.6, 15.8, CR)}" fill="#fff"/>
      <path d="M9.4 18.2H21.6" fill="none" stroke-width="2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="part" ${SOFT}/>
      <g data-n="hd">${front(u, rr(-2.6, 0, 5.2, 3, 1))}<path d="${rp([[-1.4, 3], [1.4, 3], [0, 5]], 0.3)}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), ph = 3.4 + 3.6 * o, top = 17.2 - ph;
    at(E.part, { d: rr(12.4, top, 6.2, ph, 0.6) });
    at(E.hd, { transform: `translate(${f(15.5 + rattle(o, 2.4, 4))} ${f(top - 5.2)})` });
  }
});
