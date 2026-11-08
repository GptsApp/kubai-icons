import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at, WHITES } from '../packages/core/src/kit.js';

const BODY = rr(4, 5.4, 23, 15, KR);

export default defineIcon({
  name: 'container',
  zh: '容器',
  category: 'development',
  tags: ['docker', 'shipping container', 'deploy', 'image', 'kubernetes', '集装箱'],
  variants: ['plus', 'minus', 'check', 'x', 'sync', 'up', 'down', 'lock'],
  // A shipping container with ribbed sides; on hover its end door swings open on its hinge.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <path d="M8.6 9V16.8M13.4 9V16.8" class="ln" ${WHITES}/>
    <path d="${rp(R(18.6, 7.6, 6.2, 10.6), CR)}" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="dr" fill="${u.upS}"/></g><path data-n="dro" ${OL}/>
    <path data-n="bar" class="ln" ${DEEPS}/>`,
  target: (h) => ({ w: h ? 3.2 : 9.8 }),
  draw(p, E) {
    const x = 27 - p.w, d = rp(R(x, 5.4, p.w, 15), [1.6, KR, KR, 1.6]);
    at(E.dr, { d }); at(E.dro, { d });
    at(E.bar, { d: `M${f(x + p.w / 2)} 9V16.8` });
  }
});
