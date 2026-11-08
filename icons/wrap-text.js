import { defineIcon, f, WHITE, rp, at } from '../packages/core/src/kit.js';
import { card, ROWS } from './_files-text.js';
import { MARK } from './_interface.js';

const [Y0, Y1, Y2] = ROWS;

export default defineIcon({
  name: 'wrap-text',
  zh: '自动换行',
  category: 'text',
  tags: ['wrap', 'word wrap', 'line break', 'reflow', 'text', 'format', '换行'],
  // Lines of text whose middle line curls round onto the next; on hover the margin moves in and the lines wrap sooner.
  svg: (u) => card(u, `<path data-n="l" ${MARK}/><path data-n="hd" ${WHITE}/>`),
  target: (h) => ({ x: h ? 17 : 20 }),
  draw(p, E) {
    const x = p.x, r = (Y2 - Y1) / 2, tip = 13.8 - (20 - x) * 0.8 / 3;
    at(E.l, { d: `M9.2 ${Y0}H${f(x + r)}M9.2 ${Y1}H${f(x)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${Y2}H${f(tip + 2.6)}M9.2 ${Y2}H10.6` });
    at(E.hd, { d: rp([[tip + 3.2, Y2 - 2.7], [tip, Y2], [tip + 3.2, Y2 + 2.7]], [0.5, 0.6, 0.5]) });
  }
});
