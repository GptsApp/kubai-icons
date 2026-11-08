import { defineIcon, KR, f, OL, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'banknote',
  zh: '纸币',
  category: 'commerce',
  tags: ['money', 'cash', 'bill', 'payment', 'currency', '现金', '钞票'],
  variants: ['plus', 'minus', 'check', 'x', 'up', 'down', 'right', 'sync', 'clock'],
  // Two banknotes, one on the other; on hover they fan apart as if being counted.
  svg: (u) => {
    const note = rr(0, 0, 20.6, 12.6, KR);
    return `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${note}" fill="${u.upS}"/></g></g><path d="${note}" ${OL}/></g>
      <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${note}" fill="${u.loS}"/></g></g><path d="${note}" ${OL}/>
        <path d="${circ(10.3, 6.3, 3.2)}" fill="#fff"/>
        <path d="${circ(4, 6.3, 1.25) + circ(16.6, 6.3, 1.25)}" fill="#fff" data-w="fill"/></g>`;
  },
  target: (h) => ({ b: h ? [7.2, 2.6, 7] : [6.4, 3.6, 0], fr: h ? [3.6, 9.2, -4] : [4, 8.4, 0] }),
  draw(p, E) {
    at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])}) rotate(${f(p.b[2])} 10.3 6.3)` });
    at(E.fr, { transform: `translate(${f(p.fr[0])} ${f(p.fr[1])}) rotate(${f(p.fr[2])} 10.3 6.3)` });
  }
});
