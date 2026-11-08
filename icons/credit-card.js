import { defineIcon, KR, f, OL, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'credit-card',
  zh: '银行卡',
  category: 'commerce',
  tags: ['card', 'payment', 'bank', 'debit'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'clock', 'alert', 'sync', 'cog'],
  // A card in front of another; on hover they fan apart as if being drawn out.
  svg: (u) => {
    const card = rr(0, 0, 20.4, 13.4, KR);
    return `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.upS}"/></g></g><path d="${card}" ${OL}/></g>
      <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g><path d="${card}" ${OL}/>
        <path d="${rr(2.8, 3.6, 4.6, 3.6, 1)}" fill="#fff"/>
        <path d="${lines(2.8, 10, [7.4])}" class="ln" stroke="#fff" data-w="stroke"/></g>`;
  },
  target: (h) => ({ b: h ? [7.4, 2.2, 6] : [6.6, 3.3, 0], fr: h ? [3.4, 8.8, -3] : [4, 8.3, 0] }),
  draw(p, E) {
    at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])}) rotate(${f(p.b[2])} 10.2 6.7)` });
    at(E.fr, { transform: `translate(${f(p.fr[0])} ${f(p.fr[1])}) rotate(${f(p.fr[2])} 10.2 6.7)` });
  }
});
