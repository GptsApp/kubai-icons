import { defineBadge, at, f, rr, circ, clamp01, rattle } from '../packages/core/src/kit.js';
import { disc, INK } from './_disc.js';

export default defineBadge({
  name: 'alert',
  zh: '警告',
  tone: '#D97706',
  tags: ['warning', 'alert', 'attention', 'error', 'exclamation'],
  // The badge shakes on hover and settles upright.
  svg: (u) => disc(u, `<path d="${rr(-1.1, -3.2, 2.2, 4, 1.1) + circ(0, 2.4, 1.2)}" ${INK}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.kbG, { transform: `rotate(${f(rattle(o, 18, 3))}) scale(${f(p.s)})` });
  }
});
