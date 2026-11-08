import { defineIcon, f, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';
import { band, layer, moveAll } from './_science-edu-sports.js';
import { leaf } from './_home-food.js';

const CROWN = [17.2, 6.6];
const FRONDS = [[7.4, 9.4], [11.2, 2], [23.4, 2.6], [26, 10]].map((t) => leaf(CROWN, t, 2.4)).join('');
const MOUND = 'M6.2 19.8Q15.5 11 24.8 19.8Z';
const SEA = 'M3.6 19.4Q6.6 17.6 9.6 19.4T15.5 19.4T21.4 19.4T27.4 19.4V20.4Q27.4 22.6 25.2 22.6H5.8Q3.6 22.6 3.6 20.4Z';

export default defineIcon({
  name: 'island',
  zh: '海岛',
  category: 'travel',
  tags: ['island', 'beach', 'palm', 'tropical', 'vacation', 'holiday', 'resort', '度假'],
  // A palm on a small island in the sea; on hover its fronds sway in the breeze and settle.
  svg: (u) => `${layer(u, 'fr', FRONDS, u.loS)}
    ${band(u, 'M14.4 17.4Q14.4 10.4 17.2 6.8', 2.2, u.upS)}
    ${back(u, MOUND, u.loS)}
    ${front(u, SEA, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { moveAll(E, ['fr'], `rotate(${f(rattle(clamp01(p.o), 9, 3))} ${CROWN[0]} ${CROWN[1]})`); }
});
