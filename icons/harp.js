import { defineIcon, f, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const HOLE = rp([[9, 7.8], [9.4, 20.6], [12.8, 20.6], [21.4, 10], [15.6, 10.8], [11.6, 8.6]], [1, 0.8, 0.8, 0.8, 1.2, 1.2]);
const FRAME = 'M5.4 4.4C5.4 1.6 9.6 1.2 12 3.6C15 6.6 18 7.6 21.4 5.6C23.2 4.4 26 3 26 5.6L15 23.4Q14.2 24.4 13 24.4H8.2C7 24.4 6.4 23.4 6.4 22.4Z' + HOLE;
const BOARD = rp([[24.2, 4.2], [27, 6], [15.2, 24.4], [10.8, 24.4]], [1.4, 1.4, 1, 1]);
const STRINGS = [[11.8, 7, 22], [15, 9, 19.4], [18.2, 9, 15.4]];

export default defineIcon({
  name: 'harp',
  zh: '竖琴',
  category: 'media',
  tags: ['lyre', 'strings', 'instrument', 'classical', 'pluck', 'music', '弦乐', '乐器'],
  // A concert harp with a curved neck and three strings; on hover the strings are plucked and shimmer to rest.
  svg: (u) => `<g data-n="g">${STRINGS.map((s, i) => `<path data-n="s${i}" fill="none" class="ln" data-t="stroke:#5393FF"/>`).join('')}
    ${back(u, FRAME, u.loS)}${front(u, BOARD, u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(rattle(o, 5, 2))} 11 24.4)` });
    STRINGS.forEach(([x, a, b], i) => {
      const w = rattle(o, i % 2 ? -3.2 : 3.2, 3);
      at(E[`s${i}`], { d: `M${x} ${a}Q${f(x + w)} ${f((a + b) / 2)} ${x} ${b}` });
    });
  }
});
