import { defineIcon, WHITES, rp, rr } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

// The legs open sideways by s from the crotch.
const legs = (s) => rp([[8.8, 3], [22.2, 3], [23.6 + s, 24.2], [17.8 + s * 0.5, 24.2], [15.5, 10.6], [13.2 - s * 0.5, 24.2], [7.4 - s, 24.2]],
  [0.6, 0.6, 1.2, 0.8, 0.5, 0.8, 1.2]);
const BAND = rr(8, 0.8, 15, 3.6, 1.2);
const POCKETS = 'M9.6 9.6Q12.4 9.4 12.8 6.6M21.4 9.6Q18.6 9.4 18.2 6.6';

export default defineIcon({
  name: 'pants',
  zh: '长裤',
  category: 'commerce',
  tags: ['trousers', 'jeans', 'slacks', 'clothing', 'apparel', 'wear', '裤子', '牛仔裤'],
  variants: ['plus', 'check', 'heart'],
  // A pair of long trousers with a waistband and pockets; on hover the legs step apart.
  svg: (u) => `${back(u, legs(0), u.loS, 'l')}
    <path d="${POCKETS}" class="ln" ${WHITES}/>
    ${front(u, BAND, u.upS)}`,
  target: (h) => ({ s: h ? 1.6 : 0 }),
  draw(p, E) { atAll(E, ['l', 'lO'], { d: legs(p.s) }); }
});
