import { defineIcon, KR, f, DEEP, DEEPS, WHITE, rr, at } from '../packages/core/src/kit.js';
import { back, front, bolt } from './_w2-devices.js';

// The charger's parts, raised by y.
const prongs = (y) => rr(11.4, 1.2 - y, 2.6, 6.4, 1) + rr(17, 1.2 - y, 2.6, 6.4, 1);
const neck = (y) => rr(13.1, 16.4 - y, 4.8, 4.6, 1);
const body = (y) => rr(7.4, 6.4 - y, 16.2, 12.4, KR);

export default defineIcon({
  name: 'charger',
  zh: '充电器',
  category: 'devices',
  tags: ['wall charger', 'power adapter', 'adapter', 'charge', 'plug', '充电头'],
  variants: ['check', 'x', 'alert'],
  // A wall charger with its prongs and a cable; on hover it pushes up into the wall and the
  // charge bolt lights up.
  svg: (u) => `<path data-n="pr" d="${prongs(0)}" ${DEEP}/>
      <path data-n="cb" d="M15.5 20V24.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${front(u, neck(0), u.upS, 'nk')}
      ${back(u, body(0), u.loS, 'bd')}
      <path data-n="b" d="${bolt(12.8, 9.2, 1)}" ${WHITE}/>`,
  target: (h) => ({ y: h ? 2.4 : 0, b: h ? 1 : 0.55, s: h ? 1.22 : 1 }),
  draw(p, E) {
    at(E.pr, { d: prongs(p.y) });
    at(E.cb, { d: `M15.5 ${f(20 - p.y)}V24.4` });
    const nk = neck(p.y), bd = body(p.y);
    at(E.nk, { d: nk }); at(E.nkO, { d: nk }); at(E.bd, { d: bd }); at(E.bdO, { d: bd });
    at(E.b, { opacity: f(p.b), transform: `translate(15.5 ${f(12.6 - p.y)}) scale(${f(p.s)}) translate(-15.5 -12.6)` });
  }
});
