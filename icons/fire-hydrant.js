import { defineIcon, f, DEEP, SOFTS, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_b6-vehicles.js';

const BODY = 'M9.8 22V9.6Q9.8 3.4 15.5 3.4Q21.2 3.4 21.2 9.6V22Z';

export default defineIcon({
  name: 'fire-hydrant',
  zh: '消防栓',
  category: 'travel',
  tags: ['hydrant', 'water', 'fire', 'street', 'emergency', 'plug', '消火栓'],
  // A street hydrant with outlets on both sides; on hover water gushes from the right one.
  svg: (u) => `<g data-n="t">
    <path d="${rr(13.3, 1, 4.4, 4.4, 1)}" fill="${u.pure('#2F6FE0')}"/>
    <path data-n="j" fill="none" stroke-width="2.4" stroke-linecap="round" ${SOFTS}/>
    ${front(u, rr(5, 10.6, 5.6, 6, 1.2), u.upS)}${front(u, rr(20.4, 10.6, 5.6, 6, 1.2), u.upS)}
    ${back(u, BODY, u.loS)}
    ${front(u, rr(8.4, 7.6, 14.2, 2.8, 1.2), u.upS)}
    <circle cx="15.5" cy="15" r="3.2" fill="#fff"/><circle cx="15.5" cy="15" r="1.4" ${DEEP}/>
    ${front(u, rr(7, 20.4, 17, 3.4, 1.2), u.upS)}</g>`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = p.s, x = 26 + 5 * s;
    at(E.j, { d: `M26 13.6Q${f(x)} 13.6 ${f(x)} ${f(13.6 + 8.4 * s)}`, opacity: f(Math.min(1, s * 6)) });
    at(E.t, { transform: `translate(${f(-2 * s)} 0)` });
  }
});
