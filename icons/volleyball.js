import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

// Three panel seams sweeping out from the centre, each with a parallel seam beside it.
const pt = (r, a) => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
const SEAMS = [0, 120, 240].map((a) => {
  const e = pt(12, a - 90), c = pt(7.4, a - 40), e2 = pt(12, a - 30), c2 = pt(9.6, a - 2), s2 = pt(4.6, a + 30);
  return `M0 0Q${f(c[0])} ${f(c[1])} ${f(e[0])} ${f(e[1])}M${f(s2[0])} ${f(s2[1])}Q${f(c2[0])} ${f(c2[1])} ${f(e2[0])} ${f(e2[1])}`;
}).join('');

export default defineIcon({
  name: 'volleyball',
  zh: '排球',
  category: 'sports',
  tags: ['volleyball', 'ball', 'beach volleyball', 'sport', 'game', '沙排'],
  // A volleyball with curved panels; on hover it spins a third of a turn.
  svg: (u) => `<clipPath id="${u.id('vb')}"><path d="${circ(15.5, 12.5, 11.5)}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('vb')})"><path data-n="s" d="${SEAMS}" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke"/></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>`,
  target: (h) => ({ a: h ? 120 : 0 }),
  draw(p, E) { at(E.s, { transform: `translate(15.5 12.5) rotate(${f(p.a)})` }); }
});
