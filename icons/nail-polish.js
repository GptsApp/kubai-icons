import { defineIcon, f, DEEP, WHITES, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const CAP = rp([[12.9, 1.4], [18.1, 1.4], [19, 12.4], [12, 12.4]], [1.4, 1.4, 0.6, 0.6]);
const BOTTLE = rr(7.3, 12, 16.4, 12, 4.4);

export default defineIcon({
  name: 'nail-polish',
  zh: '指甲油',
  category: 'commerce',
  tags: ['manicure', 'nails', 'lacquer', 'beauty', 'cosmetics', 'salon', '美甲', '美妆'],
  variants: ['plus', 'check', 'heart'],
  // A round bottle of polish under a tall slim cap; on hover the cap lifts away with its brush.
  svg: (u) => `<g data-n="c"><path d="${rr(14.3, 10, 2.4, 7, 0)}" ${DEEP}/></g>
    <g data-n="b">${back(u, BOTTLE, u.loS)}
    <path d="M11.2 20.4Q11.2 16.8 13.8 15.8" fill="none" class="ln" ${WHITES}/></g>
    <g data-n="c2">${back(u, CAP, u.pure('#2F6FE0'))}</g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? -2.4 : 0, b: h ? 2 : 0 }),
  draw(p, E) {
    const t = `translate(0 ${f(p.y)}) rotate(${f(rattle(clamp01(p.o), 9, 2))} 15.5 12.6)`;
    at(E.c, { transform: t }); at(E.c2, { transform: t });
    at(E.b, { transform: `translate(0 ${f(p.b)})` });
  }
});
