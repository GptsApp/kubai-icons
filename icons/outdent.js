import { defineIcon, WHITE, rp, at, bump } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';

export default defineIcon({
  name: 'outdent',
  zh: '减少缩进',
  category: 'text',
  tags: ['outdent', 'decrease indent', 'dedent', 'paragraph', 'text', 'format', '缩进'],
  // Lines of text with an arrowhead pointing back out; on hover the arrowhead and the middle line move out to the left.
  svg: (u) => card(u, `<path d="${bar(8.6, ROWS[0], 13.8)}${bar(8.6, ROWS[2], 13.8)}" ${WHITE}/>
    <path data-n="a" ${WHITE}/><path data-n="t" ${WHITE}/>`),
  target: (h) => ({ x: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.x)), b = bump(o), x = 8.6 - 1.6 * o - 0.6 * b, y = ROWS[1];
    const s = 1 + 0.3 * b, c = x + 3.4 * 2 / 3, k = (px) => c + (px - c) * s;
    at(E.a, { d: rp([[k(x + 3.4), y - 2.3 * s], [k(x + 3.4), y + 2.3 * s], [k(x), y]], [0.5, 0.5, 0.6]) });
    at(E.t, { d: bar(13.8 - 2.2 * o - 0.9 * b, y, 8.6) });
  }
});
