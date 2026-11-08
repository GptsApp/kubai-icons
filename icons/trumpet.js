import { defineIcon, f, DEEP, R, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const BELL = 'M12 10.9H19.6C22.8 10.9 25.2 8.7 26.4 5.8C26.9 4.8 28 5 28 6.2V19C28 20.2 26.9 20.4 26.4 19.4C25.2 16.5 22.8 14.3 19.6 14.3H12Z';
const LOOP = rr(6.6, 10.9, 13, 9.8, 4.4) + rp(R(9.2, 14.3, 7.8, 3.8).reverse(), 1.8);
const LEAD = rr(3.6, 10.9, 12, 3.4, 0);
const CUP = rr(2.8, 9.6, 3, 6, 1.2);
const VALVES = [8.6, 13.6, 18.6];

export default defineIcon({
  name: 'trumpet',
  zh: '小号',
  category: 'media',
  tags: ['horn', 'brass', 'instrument', 'fanfare', 'music', 'jazz', '铜管', '乐器'],
  // A trumpet with a flared bell and three valves; on hover the valves go down one after another and the bell lifts.
  svg: (u) => `<g data-n="g">
    ${back(u, LOOP, u.loS)}
    ${back(u, LEAD, u.loS)}${back(u, BELL, u.loS)}${front(u, CUP, u.upS)}
    ${VALVES.map((x, i) => `<path data-n="v${i}" d="${rr(x, 5.8, 2.4, 5.4, 1)}" ${DEEP}/>`).join('')}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(0 -0.5) rotate(${f(-6 * o)} 4 12.6)` });
    VALVES.forEach((x, i) => at(E[`v${i}`], { transform: `translate(0 ${f(1.8 * clamp01((o - i * 0.22) / 0.56))})` }));
  }
});
