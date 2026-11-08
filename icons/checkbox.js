import { defineIcon, at, scaleAt, bump } from '../packages/core/src/kit.js';
import { TILE, back, MARK, tick } from './_interface.js';

export default defineIcon({
  name: 'checkbox',
  zh: '复选框',
  category: 'interface',
  tags: ['check', 'square-check', 'tick', 'done', 'task', '勾选'],
  // A ticked box; on hover the box dips as it is pressed and the tick springs larger.
  svg: (u) => `<g data-n="box">${back(u, TILE)}</g><path data-n="m" ${MARK}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.box, { transform: scaleAt(1 - 0.06 * bump(o), 15.5, 12.5) });
    at(E.m, { d: tick(1 + 0.14 * o) });
  }
});
