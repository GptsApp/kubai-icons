import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(4, 3.3, 23, 18.4, KR);
const HEAD = rp(R(4, 3.3, 23, 4.6), [KR, KR, 0, 0]);

export default defineIcon({
  name: 'code',
  zh: '代码',
  category: 'development',
  tags: ['source', 'editor', 'html', 'programming', 'developer', '源码'],
  variants: ['plus', 'check', 'x', 'search', 'sparkle', 'lock'],
  badgeAt: [24.2, 19.8],
  // An editor window with a </> on its page; on hover the brackets open out and the slash tips.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <path d="${rr(6, 9.9, 19, 9.8, CR)}" fill="#fff"/>
    <path data-n="br" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    <path data-n="sl" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#89B5FF"/>
    <g filter="${u.hi}"><path d="${HEAD}" fill="${u.upS}"/></g><path d="${HEAD}" ${OL}/>`,
  target: (h) => ({ x: h ? 0.8 : 0, a: h ? 1 : 0 }),
  draw(p, E) {
    const l = 12.2 - p.x, r = 18.8 + p.x;
    at(E.br, { d: `M${f(l)} 12.2L${f(l - 2.7)} 14.8L${f(l)} 17.4M${f(r)} 12.2L${f(r + 2.7)} 14.8L${f(r)} 17.4` });
    const dx = 1.1 + 0.5 * p.a;
    at(E.sl, { d: `M${f(15.5 + dx)} 12.1L${f(15.5 - dx)} 17.5` });
  }
});
