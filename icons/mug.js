import { defineIcon, KR, f, OL, DEEPS, rr, at, rattle, clamp01, bump } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'mug',
  zh: '马克杯',
  category: 'food',
  tags: ['tea', 'cup', 'drink', 'hot', 'teabag', '茶杯', '喝茶'],
  variants: ['heart', 'plus'],
  // A mug of tea; on hover it is tipped up for a sip and set back down while the tea bag
  // on its string bobs up and down.
  svg: (u) => {
    const body = rr(5.6, 5.8, 15.4, 17, KR);
    const handle = rr(17.4, 9, 8.6, 10, 3.8) + rr(19.6, 11.2, 4.2, 5.6, 1.8);
    const tag = rr(0, 0, 4.6, 4.6, 1);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m0" d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path data-n="m1" d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m2" d="${body}" fill="${u.loS}"/></g></g><path data-n="m3" d="${body}" ${OL}/>
      <path data-n="str" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g data-n="tag"><g filter="${u.hi}"><path d="${tag}" fill="${u.upS}"/></g><path d="${tag}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The mug turns about its middle toward its open side; string and tag turn with it.
    const o = clamp01(p.o), a = -14 * bump(o), y = 13.4 + rattle(o, -3.6, 2);
    const t = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 14 14)`;
    for (const el of [E.m0, E.m1, E.m2, E.m3, E.str]) t ? el.setAttribute('transform', t) : el.removeAttribute('transform');
    at(E.str, { d: `M14.6 3.4Q12.4 3.6 12.4 7V${f(y)}` });
    at(E.tag, { transform: `${t ? t + ' ' : ''}translate(10.1 ${f(y)})` });
  }
});
