import { defineIcon, f, rr } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const UPPER = 'M6 19.6V4.6Q6 2.4 8.2 2.4H13.4Q15.4 2.4 15.4 4.4V9.4Q15.4 11.4 17.4 12L23.4 13.8Q26.6 14.8 26.6 18V19.6Z';
const SOLE = rr(4.6, 18.4, 23.4, 4.6, 2.3);
const TOE = 'M20.4 13Q21 13 21.6 13.3L23.4 13.8Q26.6 14.8 26.6 18V19.6H19.2V14.2Q19.2 13 20.4 13Z';
const LACES = 'M10.6 5.8H13.4M10.6 9H13.4';

export default defineIcon({
  name: 'hiking-boot',
  zh: '登山靴',
  category: 'travel',
  tags: ['hiking', 'boot', 'trekking', 'outdoor', 'trail', 'walk', '徒步', '登山'],
  // A high hiking boot side on; on hover the heel lifts and it rolls onto its toe, mid-step.
  svg: (u) => `<g transform="translate(0 -0.2)">${layer(u, 'up', UPPER, u.loS, { extra: `<path d="${LACES}" class="ln" stroke="#fff" data-w="stroke" stroke-linecap="round"/>` })}${layer(u, 'toe', TOE, u.upS, { sh: false })}${layer(u, 'so', SOLE, u.upS)}</g>`,
  target: (h) => ({ a: h ? 10 : 0 }),
  draw(p, E) { moveAll(E, ['up', 'toe', 'so'], `rotate(${f(p.a)} 28 23)`); }
});
