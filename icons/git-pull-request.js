import { defineIcon, f, OL, DEEP, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';

const node = (u, n, x, y, fill) => `<g data-n="${n}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(x, y, 3)}" fill="${fill}"/></g></g><path d="${circ(x, y, 3)}" ${OL}/></g>`;

export default defineIcon({
  name: 'git-pull-request',
  zh: '合并请求',
  category: 'development',
  tags: ['pull request', 'merge request', 'review', 'pr', 'git', '代码审查'],
  // Two lines of work; the right one bends back toward the left with an arrow, which
  // on hover rises level with the base line's top and reaches further over.
  svg: (u) => `<path d="M8.6 4.2V20.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="sh" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path data-n="hd" ${DEEP}/>
    ${node(u, 'a', 8.6, 4.2, u.loS)}${node(u, 'b', 8.6, 20.6, u.loS)}${node(u, 'c', 22.4, 20.6, u.upS)}`,
  target: (h) => ({ t: h ? 14.2 : 15.8, y: h ? 4.4 : 7.2 }),
  draw(p, E) {
    const t = p.t, b = t + 3.4, y = p.y;
    at(E.sh, { d: `M22.4 18V${f(y + 3)}Q22.4 ${f(y)} 19.4 ${f(y)}H${f(b + 0.6)}` });
    at(E.hd, { d: rp([[b, y - 2.9], [t, y], [b, y + 2.9]], [0.5, 0.6, 0.5]) });
  }
});
