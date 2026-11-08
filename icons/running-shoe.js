import { defineIcon, f, rr } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const UPPER = 'M5.4 11Q5.4 7.6 8.4 7.4H10.8Q12.4 7.4 13.2 8.8L14.8 11.6Q15.8 13.4 18 13.9L23.6 15.1Q27 16 27 18.8V19.6H5.4Z';
const SOLE = rr(4.2, 18.4, 23.8, 4.6, 2.3);
const LACES = 'M14.2 12.2L12.2 14M16.8 14.4L14.8 16.2';

export default defineIcon({
  name: 'running-shoe',
  zh: '跑鞋',
  category: 'sports',
  tags: ['sneaker', 'run', 'shoe', 'fitness', 'jog', '运动鞋', '跑步'],
  // A running shoe side on; on hover the heel lifts and it rolls onto its toe, mid-stride.
  svg: (u) => `<g transform="translate(0 -1.4)">${layer(u, 'up', UPPER, u.loS, { extra: `<path d="${LACES}" class="ln" stroke="#fff" data-w="stroke"/>` })}${layer(u, 'so', SOLE, u.upS)}</g>`,
  target: (h) => ({ a: h ? 10 : 0 }),
  draw(p, E) { moveAll(E, ['up', 'so'], `rotate(${f(p.a)} 27.4 23)`); }
});
