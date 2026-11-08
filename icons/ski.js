import { defineIcon, f, DEEP, rr } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

// A ski along +x round the origin, its tip curling up at the front.
const SKI = 'M-10 -1.5H7.4Q9.6 -1.5 10.4 -3.6Q10.9 -4.8 12.1 -4.5Q13.3 -4.1 12.8 -2.9Q11.4 1.5 7.4 1.5H-10Q-11.5 1.5 -11.5 0Q-11.5 -1.5 -10 -1.5Z';
const BIND = rr(-3.6, -4, 6, 2.5, 0.8);

export default defineIcon({
  name: 'ski',
  zh: '滑雪板',
  category: 'sports',
  tags: ['skiing', 'skis', 'snow', 'winter sport', 'slope', 'resort', '滑雪'],
  // A pair of skis side on, heading down a slope; on hover they glide on down it.
  svg: (u) => `<g transform="translate(15.5 12.5) rotate(26)">
      <g transform="translate(-1.4 -4.4)">${layer(u, 'a', SKI, u.loS, { extra: `<path d="${BIND}" ${DEEP}/>` })}</g>
      <g transform="translate(0.6 4.4)">${layer(u, 'b', SKI, u.upS, { extra: `<path d="${BIND}" ${DEEP}/>` })}</g></g>`,
  target: (h) => ({ a: h ? 1 : 0, b: h ? 1.6 : 0 }),
  draw(p, E) {
    moveAll(E, ['a'], `translate(${f(p.a)} 0)`);
    moveAll(E, ['b'], `translate(${f(p.b)} 0)`);
  }
});
