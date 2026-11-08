import { defineIcon, f, OL, DEEP, R, rp, star, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const SIDES = rp(R(3.6, 12.4, 8.4, 10.2), [1.6, 0.4, 0, 1.6]) + rp(R(19, 15.4, 8.4, 7.2), [0.4, 1.6, 1.6, 0]);

export default defineIcon({
  name: 'podium',
  zh: '领奖台',
  category: 'sports',
  tags: ['podium', 'winner', 'ranking', 'leaderboard', 'first place', 'champion', '排行榜', '冠军'],
  // A winners' podium with a star on the top step; on hover the top step rises higher.
  svg: (u) => `${back(u, SIDES, u.loS)}
    <g filter="${u.hi}"><path data-n="c" fill="${u.upS}"/></g><path data-n="cO" ${OL}/>
    <path data-n="st" d="${star(3.4, 1.5)}" ${DEEP}/>`,
  target: (h) => ({ y: h ? 4.4 : 6.6 }),
  draw(p, E) {
    const d = rp(R(11.4, p.y, 8.2, 22.6 - p.y), [1.6, 1.6, 0, 0]);
    at(E.c, { d }); at(E.cO, { d });
    at(E.st, { transform: `translate(15.5 ${f(p.y + 5.4)})` });
  }
});
