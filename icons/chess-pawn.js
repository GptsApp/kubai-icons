import { defineIcon, f, rr, circ, rattle, clamp01, bump } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const BODY = 'M12.4 12.6C12.4 15.8 11.4 18.4 9.6 19.8H21.4C19.6 18.4 18.6 15.8 18.6 12.6Z';
const NAMES = ['b', 'h', 'c', 'f'];

export default defineIcon({
  name: 'chess-pawn',
  zh: '兵',
  category: 'sports',
  tags: ['chess', 'pawn', 'game', 'strategy', 'board game', '国际象棋', '棋子'],
  // A chess pawn; on hover it is lifted, moved a square and set down.
  svg: (u) => layer(u, 'b', BODY, u.loS) + layer(u, 'h', circ(15.5, 6.4, 4.8), u.loS)
    + layer(u, 'c', rr(10.2, 10.6, 10.6, 3, 1.5), u.upS) + layer(u, 'f', rr(7.4, 19.2, 16.2, 4.2, 2), u.upS),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, NAMES, `translate(0 ${f(-2.4 * bump(o))}) rotate(${f(rattle(o, 8, 2))} 15.5 23.4)`);
  }
});
