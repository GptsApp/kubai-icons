import { defineIcon, f, rp, clamp01, rattle, at, DEEPS } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const CAN = rp([[7.2, 9.4], [23.8, 9.4], [22.6, 24], [8.4, 24]], [0.8, 0.8, 2.2, 2.2]);
const paint = (a, b) => rp([
  [6.4, 8.4], [24.6, 8.4], [24.1, 13.2], [21, 13.2], [21, 15.8 + a], [17, 15.8 + a], [17, 13.2],
  [13.6, 13.2], [13.6, 18.6 + b], [9.6, 18.6 + b], [9.6, 13.2], [6.9, 13.2]
], [1.3, 1.3, 1.3, 0.6, 2, 2, 0.6, 0.6, 2, 2, 0.6, 1.3]);

export default defineIcon({
  name: 'paint-bucket',
  zh: '油漆桶',
  category: 'tools',
  tags: ['paint can', 'pail', 'fill', 'colour', 'decorate', '刷漆', '填充'],
  // A can of paint with a wire handle; on hover the handle sways and the drips run down.
  svg: (u) => `<g data-n="bail"><path d="M7.8 9.4A7.7 7.7 0 0 1 23.2 9.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>
    ${solid(u, CAN, u.loS)}
    <g filter="${u.hi}"><path data-n="p" fill="${u.upS}"/></g><path data-n="pO" class="ol" data-t="stroke:#5393FF"/>`,
  target: (h) => ({ a: h ? 3 : 0, b: h ? 2.6 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    const d = paint(p.a, p.b);
    at(E.p, { d }); at(E.pO, { d });
    at(E.bail, { transform: `rotate(${f(rattle(clamp01(p.o), 22, 2))} 15.5 9.4)` });
  }
});
