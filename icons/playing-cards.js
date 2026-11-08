import { defineIcon, f, DEEP, rp, rr, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

// Each card stands on its bottom centre at the origin and fans out about (15.5, 22.4).
const CARD = rr(-6.4, -18.2, 12.8, 18.2, 2);
const SUIT = rp([[0, -13.4], [3.6, -9.1], [0, -4.8], [-3.6, -9.1]], 0.6);

export default defineIcon({
  name: 'playing-cards',
  zh: '扑克牌',
  category: 'sports',
  tags: ['cards', 'poker', 'deck', 'card game', 'casino', 'solitaire', '纸牌', '扑克'],
  // Two playing cards fanned in the hand; on hover the fan spreads wider.
  svg: (u) => layer(u, 'a', CARD, u.loS) + layer(u, 'b', CARD, u.upS, { extra: `<path d="${SUIT}" ${DEEP}/>` }),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, ['a'], `translate(${f(13.2 - 0.6 * o)} 22.4) rotate(${f(-14 - 8 * o)})`);
    moveAll(E, ['b'], `translate(${f(17.6 + 0.6 * o)} 22.6) rotate(${f(10 + 6 * o)})`);
  }
});
