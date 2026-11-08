import { defineIcon, f, rr, rattle, clamp01, bump } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

// The board points up along -y round the origin; it is drawn turned 35° to the right.
const BOARD = 'M0 -12.6C5.2 -8.6 5.4 3.6 3.8 9.6Q0 13.4 -3.8 9.6C-5.4 3.6 -5.2 -8.6 0 -12.6Z';
const PAD = rr(-2.6, 3, 5.2, 6.4, 2.6);

export default defineIcon({
  name: 'surfboard',
  zh: '冲浪板',
  category: 'sports',
  tags: ['surf', 'surfing', 'board', 'beach', 'wave', 'water sport', '冲浪'],
  // A surfboard with a tail pad; on hover it rides up a wave, rocking, and levels out.
  svg: (u) => `<clipPath id="${u.id('sb')}"><path d="${BOARD}"/></clipPath>
    ${layer(u, 'b', BOARD, u.loS, { extra: `<path d="M-6 -6.6H6V-4.2H-6Z" fill="#fff" clip-path="url(#${u.id('sb')})"/>` })}
    ${layer(u, 'p', PAD, u.upS, { sh: false })}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, ['b', 'p'], `translate(15.5 ${f(12.5 - 1.6 * bump(o))}) rotate(${f(40 + rattle(o, 10, 2))})`);
  }
});
