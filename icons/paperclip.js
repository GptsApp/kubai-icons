import { defineIcon, f, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { back } from './_interface.js';
import { ribbon, arcPts } from './_w2-interface.js';

// One bent wire: the inner run, a small loop at the foot, the right run, a wide loop at the head, the left run.
const CLIP = ribbon([
  [0, -1], ...arcPts(3.2, 7, 3.2, 180, 0, 14), ...arcPts(0, -3.9, 6.4, 0, -180, 28), [-6.4, 4.4]
], 2.4, true);

export default defineIcon({
  name: 'paperclip',
  zh: '附件',
  category: 'interface',
  tags: ['attachment', 'attach', 'paperclip', 'clip', 'file', '回形针'],
  // A paperclip; on hover it rocks from its head as if just clipped on.
  svg: (u) => `<g data-n="c">${back(u, CLIP)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.c, { transform: `translate(15.5 12.5) rotate(${f(rattle(clamp01(p.o), 9, 2))} 0 -10)` }); }
});
