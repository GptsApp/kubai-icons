import { defineIcon, f, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { DISC, back, MARK } from './_interface.js';

export default defineIcon({
  name: 'circle-alert',
  zh: '提醒',
  category: 'interface',
  tags: ['alert', 'warning', 'error', 'attention', 'exclamation', '注意'],
  // A round alert whose exclamation mark shakes and settles on hover.
  svg: (u) => `${back(u, DISC)}<g data-n="m"><path d="M15.5 6.6V13.4" ${MARK}/><circle cx="15.5" cy="17.8" r="1.6" fill="#fff" data-w="fill"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.m, { transform: `rotate(${f(rattle(clamp01(p.o), 24, 3))} 15.5 19.4)` }); }
});
