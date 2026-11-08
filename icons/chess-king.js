import { defineIcon, f, rp, rr, R, rattle, clamp01, bump } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const CROSS = rp(R(14.3, 0.6, 2.4, 6.4), 0.6) + rp(R(12.7, 2.2, 5.6, 2.4), 0.6);
const HEAD = rp([[10.6, 5.6], [20.4, 5.6], [18.6, 11.4], [12.4, 11.4]], [1.6, 1.6, 0.4, 0.4]);
const BODY = 'M12.2 12.8C12.2 16 11.4 18.4 9.6 19.8H21.4C19.6 18.4 18.8 16 18.8 12.8Z';
const NAMES = ['x', 'b', 'h', 'c', 'f'];

export default defineIcon({
  name: 'chess-king',
  zh: '国王',
  category: 'sports',
  tags: ['chess', 'king', 'game', 'strategy', 'board game', 'checkmate', '国际象棋', '棋子'],
  // A chess king; on hover it is lifted, moved a square and set down.
  svg: (u) => layer(u, 'x', CROSS, u.loS) + layer(u, 'b', BODY, u.loS) + layer(u, 'h', HEAD, u.loS)
    + layer(u, 'c', rr(10.2, 10.4, 10.6, 3, 1.5), u.upS) + layer(u, 'f', rr(7.4, 19.2, 16.2, 4.2, 2), u.upS),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, NAMES, `translate(0 ${f(-2.4 * bump(o))}) rotate(${f(rattle(o, 8, 2))} 15.5 23.4)`);
  }
});
