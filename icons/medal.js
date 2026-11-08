import { defineIcon, f, DEEP, rp, circ, star, rattle, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const STRAP_L = rp([[8.4, 1.4], [13, 1.4], [17.2, 10], [12.6, 10]], 0.6);
const STRAP_R = rp([[18, 1.4], [22.6, 1.4], [18.4, 10], [13.8, 10]], 0.6);
const NAMES = ['sl', 'sr', 'd', 'i'];

export default defineIcon({
  name: 'medal',
  zh: '奖牌',
  category: 'sports',
  tags: ['prize', 'winner', 'olympic', 'achievement', 'gold', '金牌'],
  // A medal on a crossed ribbon; on hover it swings from the ribbon and settles.
  svg: (u) => `${layer(u, 'sl', STRAP_L, u.upS, { sh: false })}${layer(u, 'sr', STRAP_R, u.loS, { sh: false })}
    ${layer(u, 'd', circ(15.5, 15.4, 7.8), u.loS)}
    ${layer(u, 'i', circ(15.5, 15.4, 5.2), u.upS, { sh: false, extra: `<path d="${star(3.4, 1.5)}" transform="translate(15.5 15.7)" ${DEEP}/>` })}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { moveAll(E, NAMES, `rotate(${f(rattle(clamp01(p.o), 12, 3))} 15.5 1.4)`); }
});
