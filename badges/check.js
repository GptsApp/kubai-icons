import { defineBadge, at, f, clamp01 } from '../packages/core/src/kit.js';
import { disc, pop, INKS } from './_disc.js';

const L = 8.2;
export default defineBadge({
  name: 'check',
  zh: '完成',
  tone: '#16A34A',
  tags: ['done', 'complete', 'check', 'success', 'verified', 'ok'],
  // On hover the tick lifts off and is written again.
  svg: (u) => disc(u, `<path data-n="kbM" d="M-2.6 0.1L-0.8 1.9L2.6 -1.7" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" ${INKS}/>`),
  target: (h) => ({ s: h ? 1.14 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), shown = o < 0.25 ? 1 - o / 0.25 : (o - 0.25) / 0.75;
    at(E.kbG, { transform: pop(p.s) });
    at(E.kbM, { 'stroke-dashoffset': f(L * (1 - shown)) });
  }
});
