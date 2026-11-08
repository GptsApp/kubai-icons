import { defineIcon, CR, f, DEEP, WHITE, rp, rr, star, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

// The shell: bevelled top corners, shoulders, and an edge connector below them.
const SHELL = rp([[9.4, 1], [21.6, 1], [24.7, 4.1], [24.7, 18.6], [23.4, 18.6], [23.4, 24], [7.6, 24], [7.6, 18.6], [6.3, 18.6], [6.3, 4.1]],
  [1.4, 1.4, 1.4, 1.6, 0.2, 1.2, 1.2, 0.2, 1.6, 1.4]);
const PINS = [8.9, 13.9, 18.9].map((x) => rp([[x, 20.4], [x + 3.2, 20.4], [x + 3.2, 24], [x, 24]], [0.6, 0.6, 0, 0])).join('');

export default defineIcon({
  name: 'game-cartridge',
  zh: '游戏卡带',
  category: 'devices',
  tags: ['cartridge', 'retro game', 'console', 'rom', 'video game', 'cart', '卡带', '游戏卡'],
  variants: ['plus', 'check', 'star'],
  // A game cartridge with a bevelled shell, a label and edge contacts; on hover it seats a
  // little deeper and the game on its label lights up.
  svg: (u) => `<g data-n="g">${back(u, SHELL)}
      <path d="${PINS}" ${WHITE}/>
      <path d="${rr(9, 4, 13, 12, CR)}" fill="#fff"/>
      <path data-n="st" d="${star(4.8, 2.3)}" ${DEEP}/></g>`,
  target: (h) => ({ d: h ? 1.4 : 0, s: h ? 1.2 : 1 }),
  draw(p, E) {
    at(E.g, { transform: `translate(0 ${f(p.d)})` });
    at(E.st, { transform: `translate(15.5 10.2) scale(${f(p.s)})` });
  }
});
