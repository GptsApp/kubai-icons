import { defineIcon, WHITE, rp, at, bump } from '../packages/core/src/kit.js';
import { card, bar, ROWS } from './_files-text.js';

export default defineIcon({
  name: 'indent',
  zh: '增加缩进',
  category: 'text',
  tags: ['indent', 'increase indent', 'tab', 'paragraph', 'text', 'format', '缩进'],
  // Lines of text with the middle one indented behind an arrowhead; on hover the arrowhead pushes it further in, past and back.
  svg: (u) => card(u, `<path d="${bar(8.6, ROWS[0], 13.8)}${bar(8.6, ROWS[2], 13.8)}" ${WHITE}/>
    <path data-n="a" ${WHITE}/><path data-n="t" ${WHITE}/>`),
  target: (h) => ({ x: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.x)), x = 8.6 + 3.6 * o + 1 * bump(o), y = ROWS[1];
    const s = 1 + 0.3 * bump(o), c = x + 3.4 / 3, k = (px) => c + (px - c) * s;
    at(E.a, { d: rp([[k(x), y - 2.3 * s], [k(x + 3.4), y], [k(x), y + 2.3 * s]], [0.5, 0.6, 0.5]) });
    at(E.t, { d: bar(x + 5.2, y, 22.4 - x - 5.2) });
  }
});
