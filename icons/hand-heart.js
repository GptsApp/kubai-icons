import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const HEART = 'M0 9.6C-5.5 5.6 -10.9 1.4 -10.9 -3.6C-10.9 -7 -8.3 -9.6 -5.1 -9.6C-2.9 -9.6 -1.1 -8.4 0 -6.6C1.1 -8.4 2.9 -9.6 5.1 -9.6C8.3 -9.6 10.9 -7 10.9 -3.6C10.9 1.4 5.5 5.6 0 9.6Z';

export default defineIcon({
  name: 'hand-heart',
  zh: '关爱',
  category: 'people',
  tags: ['care', 'charity', 'donate', 'kindness', 'volunteer', 'love', 'support', '公益'],
  // An open hand holding up a heart; on hover the heart beats in the palm.
  svg: (u) => `${back(u, rr(6.2, 14.2, 21, 6.2, 3.1), u.loS)}
    <g data-n="h"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEART}" fill="${u.upS}"/></g></g><path d="${HEART}" ${OL}/></g>
    <g transform="translate(9.6 17.2) rotate(-32)">${front(u, rr(0, -1.9, 9.4, 3.8, 1.9), u.upS)}</g>
    ${front(u, rr(3.4, 12.2, 4.6, 9.6, 1.6), u.upS)}`,
  target: (h) => ({ s: h ? 0.68 : 0.6 }),
  draw(p, E) {
    // Scaled about the heart's tip, which rests in the palm.
    at(E.h, { transform: `translate(19.8 14.4) scale(${f(p.s)}) translate(0 -9.6)` });
  }
});
