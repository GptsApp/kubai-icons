import { defineIcon, f, OL, DEEPS, rp, rr, at, clamp01, bump } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'cup-soda',
  zh: '汽水',
  category: 'food',
  tags: ['soda', 'drink', 'straw', 'cola', 'juice', 'beverage', '饮料'],
  variants: ['plus', 'star'],
  // A clear cup with a lid and straw; on hover it tips toward the drinker and back while the
  // drink in it stays level and goes down as it is sipped.
  svg: (u) => {
    const cup = rp([[8.4, 8], [22.6, 8], [20.8, 23.4], [10.2, 23.4]], [0.6, 0.6, 1.8, 1.8]), lid = rr(6.6, 5.6, 17.8, 3.8, 1.6);
    return `<path data-n="c0" d="M15.8 20V5L18.4 0.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><path data-n="c1" d="${cup}" fill="${u.upS}"/></g>
      <clipPath id="${u.id('cup')}"><path d="${cup}"/></clipPath>
      <g data-n="c2" clip-path="url(#${u.id('cup')})"><g filter="${u.hi}"><path data-n="drink" fill="${u.loS}"/></g></g>
      <path data-n="c3" d="M15.8 20V9" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="c4" d="${cup}" ${OL}/>
      <g filter="${u.hi}"><path data-n="c5" d="${lid}" fill="${u.upS}"/></g><path data-n="c6" d="${lid}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 17.2 : 11.6, o: h ? 1 : 0 }),
  draw(p, E) {
    // The cup turns about its middle; the drink turns back so its surface stays level,
    // and is drawn wider while tipped so it still fills the cup's corners.
    const o = clamp01(p.o), a = 15 * bump(o);
    const t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 15.5 15)`;
    for (let i = 0; i < 7; i++) t ? E['c' + i].setAttribute('transform', t) : E['c' + i].removeAttribute('transform');
    if (t) at(E.drink, { d: rr(0, p.y, 31, 32 - p.y, 0), transform: `rotate(${f(-a)} 15.5 15)` });
    else { at(E.drink, { d: rr(6, p.y, 19, 24 - p.y, 0) }); E.drink.removeAttribute('transform'); }
  }
});
