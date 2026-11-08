import { defineIcon, f, WHITE, DEEP, rp, circ, ellipse, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const BODY = 'M9.2 4.2L8.4 15.4C8.4 21 11.4 24.2 16 24.2C20.6 24.2 24.2 21.4 24.4 16.2L24.7 11.4C24.8 9 25.4 6.4 27 3.8H17C18.4 6 19.1 8.6 19 11.4L18.6 15.4C18.5 17.6 17.8 18.6 16.2 18.6C14.6 18.6 13.7 17.4 13.6 15.4L13 6C13 3.2 11.2 1.6 8.6 1.6V4.1Z';
const MOUTH = ellipse(22, 3.8, 5.6, 2.1);
const TIP = rp([[9.4, 1], [9.4, 4.7], [3.6, 5], [3.2, 3.4]], [0.6, 0.6, 0.6, 0.6]);
const KEYS = circ(11, 9.6, 1.4) + circ(11.2, 14.6, 1.4) + circ(21.7, 14.8, 1.6);

export default defineIcon({
  name: 'saxophone',
  zh: '萨克斯',
  category: 'media',
  tags: ['sax', 'jazz', 'woodwind', 'instrument', 'music', 'band', '爵士', '乐器'],
  // A saxophone with a mouthpiece, a U-shaped bow and a flared bell; on hover it rocks as if being played.
  svg: (u) => `<g data-n="g">
    ${back(u, BODY, u.loS)}
    <path d="${TIP}" ${DEEP}/>
    ${front(u, MOUTH, u.upS)}
    <path d="${KEYS}" ${WHITE}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 11, 3))} 15.6 24)` }); }
});
