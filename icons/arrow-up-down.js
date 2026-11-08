import { defineIcon } from '../packages/core/src/kit.js';
import { tile, mark, place, arrow, swell, at } from './_arrows.js';

// Drawn as a left-right pair and turned a quarter: up on the left, down on the right.
const TOP = arrow(-4.8, -2.9, 4.4, -2.9, 3.2, 2.6), BOT = arrow(4.8, 2.9, -4.4, 2.9, 3.2, 2.6);

export default defineIcon({
  name: 'arrow-up-down',
  zh: '上下排序',
  category: 'arrows',
  tags: ['sort', 'order', 'reorder', 'vertical', 'swap', '排序'],
  // A tile with an up arrow and a down arrow side by side; on hover each darts the way
  // it points, sliding past the other, then settles a little out.
  svg: (u) => tile(u) + mark(TOP.shaft, TOP.head, 'a1') + mark(BOT.shaft, BOT.head, 'a2'),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = 0.9 * p.o + 1.6 * swell(p.o);
    at(E.a1, { transform: `${place(0, 0, -s)} rotate(-90)` });
    at(E.a2, { transform: `${place(0, 0, s)} rotate(-90)` });
  }
});
