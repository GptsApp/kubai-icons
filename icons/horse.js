import { defineIcon, f, OL, WHITE, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { layer, move } from './_w2-people.js';

// A horse's head and neck in profile facing right, with an ear and a rounded muzzle.
const HEAD = 'M7.4 23.4C7.2 16.6 8.4 10.6 11.4 6.6L12 2.6Q12.4 1.4 13.2 2.4L15.6 5C19.8 5.8 23.4 9.6 26.2 14.6Q27.4 16.8 25.6 17.8L24.2 18.6Q22.4 19.6 21 18.2L18.8 15.8C17.8 17.8 17.8 20.4 18.6 23.4Z';
const MANE = 'M12.4 4.6C8.2 8.4 5.4 14 4.6 23.4H8.6C8.6 16.8 10.2 11.6 13.4 7.6Z';

export default defineIcon({
  name: 'horse',
  zh: '马',
  category: 'nature',
  tags: ['horse', 'pony', 'stallion', 'animal', 'equestrian', 'farm', '骏马'],
  // A horse's head with a lighter mane; on hover it nods and its mane swings.
  svg: (u) => `<g data-n="h"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" stroke-linejoin="round" ${OL}/>
    <circle cx="18.4" cy="10" r="1.4" ${WHITE}/>
    ${layer(u, MANE, u.upS, 'm', { sh: false })}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.h, { transform: `rotate(${f(rattle(o, 7, 2))} 12 23)` });
    move(E, 'm', `rotate(${f(rattle(o, -5, 3))} 8 23)`);
  }
});
