import { defineIcon, f, WHITE, at, bump } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';

const W = [6.4, 9.2, 7.8];

export default defineIcon({
  name: 'list-ordered',
  zh: '编号列表',
  category: 'text',
  tags: ['list', 'numbered', 'ordered', 'steps', 'sequence', '有序列表'],
  // A numbered list; on hover the first two items trade places while the numbers stay.
  svg: (u) => card(u, ROWS.map((y, i) => `<text x="9.6" y="${f(y + 1.75)}" text-anchor="middle" font-size="5" font-weight="700" ${WHITE}>${i + 1}</text>`).join('')
    + W.map((_, i) => `<path data-n="t${i}" ${WHITE}/>`).join('')),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The two bars cross on slightly different paths so they never sit on one another.
    const o = Math.max(0, Math.min(1, p.o)), d = ROWS[1] - ROWS[0], k = bump(o);
    at(E.t0, { d: bar(12.8 + 1.2 * k, ROWS[0] + d * o, W[0]) });
    at(E.t1, { d: bar(12.8 - 0.4 * k, ROWS[1] - d * o, W[1]) });
    at(E.t2, { d: bar(12.8, ROWS[2], W[2]) });
  }
});
