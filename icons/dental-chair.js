import { defineIcon, f, DEEPS, rp, rr } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';
import { layer, moveAll } from './_science-edu-sports.js';

// The backrest is drawn upright from the hip, then laid back about it.
const HX = 13, HY = 15;
const BACK = rr(-2.8, -12, 5.6, 14, 2.8);
const SEAT = rp([[10.4, 12.2], [19.6, 12.2], [27.8, 15.6], [26.2, 19.8], [18.8, 16.9], [10.4, 16.9]], [2.3, 1, 1.9, 1.9, 1, 2.3]);
const COLUMN = rr(12.4, 16, 6.2, 6, 0), FOOT = rr(7, 20.8, 17, 3.2, 1.6);
const LAMP = 'M17.4 8A5 5 0 0 1 27.4 8Z';

export default defineIcon({
  name: 'dental-chair',
  zh: '牙科椅',
  category: 'health',
  tags: ['dentist', 'dental', 'clinic', 'treatment chair', 'oral care', '牙医', '口腔'],
  // A dentist's reclining chair under its lamp; on hover the backrest lies back and the lamp comes down.
  svg: (u) => `<path d="M15.5 14V1.6H22.4V3" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    ${solid(u, COLUMN, u.loS)}${solid(u, FOOT, u.upS)}
    ${layer(u, 'bk', BACK, u.loS)}
    ${solid(u, SEAT, u.upS)}
    ${layer(u, 'lp', LAMP, u.upS)}`,
  target: (h) => ({ a: h ? -46 : -22, ly: h ? 1.6 : 0 }),
  draw(p, E) {
    moveAll(E, ['bk'], `translate(${HX} ${HY}) rotate(${f(p.a)})`);
    moveAll(E, ['lp'], `translate(0 ${f(p.ly)})`);
  }
});
