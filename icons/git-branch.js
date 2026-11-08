import { defineIcon, f, OL, DEEPS, circ, at } from '../packages/core/src/kit.js';

const node = (u, n, fill) => `<g data-n="${n}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(0, 0, 3.2)}" fill="${fill}"/></g></g><path d="${circ(0, 0, 3.2)}" ${OL}/></g>`;

export default defineIcon({
  name: 'git-branch',
  zh: '分支',
  category: 'development',
  tags: ['branch', 'version control', 'fork', 'repository', 'git', '版本'],
  // A main line with a branch curving off it; on hover the branch grows further out.
  svg: (u) => `<path d="M9.4 4.6V20.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="bl" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${node(u, 'a', u.loS)}${node(u, 'b', u.loS)}${node(u, 'c', u.upS)}`,
  target: (h) => ({ n: h ? [22.8, 5.2] : [21.4, 7] }),
  draw(p, E) {
    const [x, y] = p.n;
    at(E.a, { transform: 'translate(9.4 4.6)' }); at(E.b, { transform: 'translate(9.4 20.4)' });
    at(E.c, { transform: `translate(${f(x)} ${f(y)})` });
    at(E.bl, { d: `M${f(x)} ${f(y)}C${f(x)} ${f(y + 7)} 9.4 ${f(y + 3.6)} 9.4 16.4` });
  }
});
