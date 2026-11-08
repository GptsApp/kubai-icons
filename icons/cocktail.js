import { defineIcon, f, OL, DEEPS, rp, rr, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const BOWL = rp([[5.2, 2.6], [25.8, 2.6], [15.5, 13.8]], [1.2, 1.2, 1.6]);

export default defineIcon({
  name: 'cocktail',
  zh: '鸡尾酒',
  category: 'food',
  tags: ['martini', 'drink', 'bar', 'alcohol', 'olive', 'party', 'happy hour', '酒吧'],
  variants: ['heart', 'star'],
  // A cocktail glass with an olive on a pick; on hover it is tipped by its stem one way
  // and the other while the drink sloshes level and the pick wobbles, then it settles.
  svg: (u) => {
    const foot = rr(10, 20.6, 11, 3, 1.5), olive = circ(13.4, 8, 2.2);
    return `<path data-n="stem" d="M15.5 13V21" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="ft" d="${foot}" fill="${u.upS}"/></g></g><path data-n="ftO" d="${foot}" ${OL}/>
      <g filter="${u.sh}"><path data-n="bw" d="${BOWL}" fill="${u.upS}"/></g>
      <clipPath id="${u.id('bowl')}"><path d="${BOWL}"/></clipPath>
      <g data-n="cl" clip-path="url(#${u.id('bowl')})"><g data-n="drink"><g filter="${u.hi}"><path d="${rr(2, 5.4, 27, 12, 0)}" fill="${u.loS}"/></g></g></g>
      <path data-n="bwO" d="${BOWL}" ${OL}/>
      <g data-n="pick"><path d="M13.4 8L20.6 -0.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path d="${olive}" fill="${u.upS}"/></g><path d="${olive}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The glass turns about the hand on its stem; the drink turns back to stay near level.
    const o = clamp01(p.o), a = rattle(o, 9, 2), s = rattle(o, 12, 3);
    const t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 15.5 17)`;
    [E.stem, E.ft, E.ftO, E.bw, E.cl, E.bwO].forEach((el) => (t ? el.setAttribute('transform', t) : el.removeAttribute('transform')));
    at(E.drink, { transform: `rotate(${f(-a + s)} 15.5 7)` });
    at(E.pick, { transform: `${t ? t + ' ' : ''}rotate(${f(s * 0.6)} 15.5 10)` });
  }
});
