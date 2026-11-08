import { defineIcon, KR, CR, OL, R, rp, rr, circ, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';
import { wheel } from './_travel-transport.js';

const PUFF = [[9.4, 3.6, 2.4], [13.2, 1.8, 1.8]];

export default defineIcon({
  name: 'locomotive',
  zh: '蒸汽火车',
  category: 'transport',
  tags: ['steam train', 'locomotive', 'railway', 'engine', 'vintage', 'train', '火车头'],
  variants: ['check', 'clock'],
  // A steam locomotive side on; on hover puffs of steam rise from its chimney.
  svg: (u) => `${PUFF.map((_, i) => `<g data-n="p${i}"><g filter="${u.hi}"><path data-n="q${i}" fill="${u.upS}"/></g><path data-n="q${i}O" ${OL}/></g>`).join('')}
    ${back(u, rp([[6.8, 6.4], [11.2, 6.4], [10.4, 10.4], [7.6, 10.4]], [0.8, 0.8, 0, 0]), u.loS)}
    ${back(u, rr(17.6, 3.6, 9.4, 15.4, KR), u.loS)}
    <path d="${rr(19.6, 5.8, 5.4, 4.4, CR)}" fill="#fff"/>
    ${front(u, rp(R(4, 10, 15.4, 8.6), [4.3, 1.6, 0, 1.6]), u.upS)}
    ${wheel(u, 8.6, 19.8, 3)}${wheel(u, 14.6, 19.8, 3)}${wheel(u, 22.4, 19.4, 3.4)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    PUFF.forEach(([x, y, r], i) => {
      const t = clamp01((o - i * 0.3) / 0.7), d = circ(9 + (x - 9) * t, 7 + (y - 7) * t, Math.max(0.01, r * t));
      at(E[`q${i}`], { d }); at(E[`q${i}O`], { d }); at(E[`p${i}`], { opacity: t > 0.02 ? 1 : 0 });
    });
  }
});
