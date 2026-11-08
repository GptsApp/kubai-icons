import { defineIcon, KR, f, OL, DEEPS, rr, at, clamp01, bump } from '../packages/core/src/kit.js';

const TEAT = 'M12.6 7.4C12.6 4.8 13.6 1.4 15.5 1.4C17.4 1.4 18.4 4.8 18.4 7.4Z';

export default defineIcon({
  name: 'baby-bottle',
  zh: '奶瓶',
  category: 'food',
  tags: ['baby', 'feeding', 'milk', 'formula', 'infant', 'nursing', '喂奶', '婴儿'],
  variants: ['clock'],
  // A baby's feeding bottle; on hover it tips over to feed and rights itself while the milk
  // in it stays level and goes down as the baby drinks.
  svg: (u) => {
    const body = rr(9.4, 9.2, 12.2, 14.8, KR), collar = rr(8.4, 6.4, 14.2, 3.8, 1.4);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b0" d="${TEAT}" fill="${u.upS}"/></g></g><path data-n="b1" d="${TEAT}" ${OL}/>
      <g filter="${u.sh}"><path data-n="b2" d="${body}" fill="${u.upS}"/></g>
      <clipPath id="${u.id('b')}"><path d="${body}"/></clipPath>
      <g data-n="b3" clip-path="url(#${u.id('b')})"><g filter="${u.hi}"><path data-n="milk" fill="${u.loS}"/></g></g>
      <path data-n="b4" d="M11.8 14.6H14M11.8 18H13.2" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="b5" d="${body}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b6" d="${collar}" fill="${u.loS}"/></g></g><path data-n="b7" d="${collar}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 18.8 : 12.2, o: h ? 1 : 0 }),
  draw(p, E) {
    // The bottle turns about its middle; the milk turns back so its surface stays level,
    // and is drawn wider while tipped so it still fills the bottle's corners.
    const o = clamp01(p.o), a = 24 * bump(o);
    const t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 15.5 16)`;
    for (let i = 0; i < 8; i++) t ? E['b' + i].setAttribute('transform', t) : E['b' + i].removeAttribute('transform');
    if (t) at(E.milk, { d: rr(0, p.y, 31, 32 - p.y, 0), transform: `rotate(${f(-a)} 15.5 16)` });
    else { at(E.milk, { d: rr(8, p.y, 15, 26 - p.y, 0) }); E.milk.removeAttribute('transform'); }
  }
});
