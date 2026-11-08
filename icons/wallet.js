import { defineIcon, KR, f, OL, DEEPS, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'wallet',
  zh: '钱包',
  category: 'commerce',
  tags: ['money', 'payment', 'purse', 'cash'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'clock', 'alert', 'cog', 'up', 'down'],
  // A wallet; the card tucked in it rises on hover.
  svg: (u) => {
    const body = rr(4, 5.6, 23, 16.1, KR), pocket = rp(R(4, 11, 23, 10.7), [1.6, 1.6, KR, KR]), card = rr(0, 0, 15, 9, 1.4);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g data-n="card"><g filter="${u.hi}"><path d="${card}" fill="${u.upS}"/></g><path d="${card}" ${OL}/><path d="${lines(2.2, 2.6, [5.6])}" class="ln" ${DEEPS}/></g>
      <g filter="${u.hi}"><path d="${pocket}" fill="${u.up(10.7)}"/></g><path d="${pocket}" ${OL}/>
      <path d="${rr(19.4, 13.6, 7.6, 4.8, 2.4)}" fill="${u.loS}"/><path d="${rr(19.4, 13.6, 7.6, 4.8, 2.4)}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 2.4 : 4.6 }),
  draw(p, E) { at(E.card, { transform: `translate(6.6 ${f(p.y)})` }); }
});
