import { defineIcon, KR, CR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

const PCB = rp([[4, 5.4], [27, 5.4], [27, 19.2], [16.6, 19.2], [16.6, 16.6], [12.6, 16.6], [12.6, 19.2], [4, 19.2]],
  [KR, KR, KR, 0, 0.8, 0.8, 0, KR]);
const CHIPS = [6.2, 12.9, 19.6];

export default defineIcon({
  name: 'memory-stick',
  zh: '内存条',
  category: 'devices',
  tags: ['ram', 'memory', 'dimm', 'hardware', '内存'],
  variants: ['plus', 'check', 'x', 'alert', 'up', 'down'],
  // A memory module with three chips over its contact strip; on hover the chips light up in turn.
  svg: (u) => {
    const sl = rp(R(4, 15.6, 8.6, 3.6), [1.4, 1.4, 0, KR]), sr = rp(R(16.6, 15.6, 10.4, 3.6), [1.4, 1.4, KR, 0]);
    return `${solid(u, PCB, u.loS)}
      <g filter="${u.hi}"><path d="${sl + sr}" fill="${u.upS}"/></g><path d="${sl}" ${OL}/><path d="${sr}" ${OL}/>
      ${CHIPS.map((x, i) => `<path d="${rr(x, 7.4, 5.2, 5.2, CR)}" fill="#fff"/><path data-n="c${i}" d="${rr(x, 7.4, 5.2, 5.2, CR)}" fill="${u.pure('#4389FF')}"/>`).join('')}`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { CHIPS.forEach((x, i) => at(E['c' + i], { opacity: f(span(p.o, i * 0.22, i * 0.22 + 0.4)) })); }
});
