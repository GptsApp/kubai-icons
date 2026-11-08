import { defineIcon, f, DEEPS, clamp01, at } from '../packages/core/src/kit.js';

const GUSTS = [
  'M4 7.9H14.35A2.3 2.3 0 1 0 12.97 3.76',
  'M4 12.5H24.13A2.875 2.875 0 1 0 21.83 7.9',
  'M4 17.1H17.8A2.3 2.3 0 1 1 16.42 21.24'
];

export default defineIcon({
  name: 'wind',
  zh: '风',
  category: 'weather',
  tags: ['breeze', 'air', 'gust', 'windy', 'weather', '大风'],
  // Three gusts that curl at their ends; on hover each one blows through from left to
  // right and comes in again behind itself, one after another.
  svg: () => GUSTS.map((d, i) => `<path data-n="g${i}" d="${d}" pathLength="100" stroke-dasharray="100 100" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`).join(''),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    [1, 0, 2].forEach((g, i) => {
      const t = clamp01((o - i * 0.1) / 0.8);
      at(E[`g${g}`], { 'stroke-dashoffset': f(-200 * t), opacity: t > 0.47 && t < 0.53 ? 0 : 1 });
    });
  }
});
