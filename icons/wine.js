import { defineIcon, f, OL, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const BOWL = 'M9.4 2.4H21.6C22 9.4 19.6 14.6 15.5 14.6C11.4 14.6 9 9.4 9.4 2.4Z';

export default defineIcon({
  name: 'wine',
  zh: '红酒',
  category: 'food',
  tags: ['wine glass', 'drink', 'bar', 'alcohol', 'cheers', 'dinner', '葡萄酒', '酒杯'],
  variants: ['heart', 'star', 'plus'],
  // A wine glass; on hover it is tipped by its stem one way and the other while the wine
  // sloshes level in the bowl, then it settles upright.
  svg: (u) => {
    const foot = rr(10, 20.4, 11, 3, 1.5);
    return `<path data-n="stem" d="M15.5 14V21" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="ft" d="${foot}" fill="${u.upS}"/></g></g><path data-n="ftO" d="${foot}" ${OL}/>
      <g filter="${u.sh}"><path data-n="bw" d="${BOWL}" fill="${u.upS}"/></g>
      <clipPath id="${u.id('bowl')}"><path d="${BOWL}"/></clipPath>
      <g data-n="cl" clip-path="url(#${u.id('bowl')})"><g data-n="wine"><g filter="${u.hi}"><path d="${rr(4, 7.6, 23, 12, 0)}" fill="${u.loS}"/></g></g></g>
      <path data-n="bwO" d="${BOWL}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The glass turns about the hand on its stem; the wine turns back to stay near level.
    const o = clamp01(p.o), a = rattle(o, 9, 2);
    const t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 15.5 17)`;
    [E.stem, E.ft, E.ftO, E.bw, E.cl, E.bwO].forEach((el) => (t ? el.setAttribute('transform', t) : el.removeAttribute('transform')));
    at(E.wine, { transform: `rotate(${f(-a + rattle(o, 12, 3))} 15.5 9)` });
  }
});
