import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { node, move, MARK } from './_w2-dev.js';

export default defineIcon({
  name: 'git-merge',
  zh: '合并分支',
  category: 'development',
  tags: ['merge', 'branch', 'version control', 'join', 'git', '合并'],
  // A main line with a branch curving down into it from a side commit; on hover the side
  // commit is drawn in closer to the line.
  svg: (u) => `<path d="M9.4 4.6V21.4" ${MARK}/><path data-n="bl" ${MARK}/>
    ${node(u, 'a', 3.2, u.loS)}${node(u, 'c', 3.2, u.upS)}`,
  target: (h) => ({ n: h ? [20.4, 15.4] : [21.6, 17.2] }),
  draw(p, E) {
    const [x, y] = p.n;
    move(E, 'a', 9.4, 4.6); move(E, 'c', x, y);
    at(E.bl, { d: `M9.4 7.6Q9.4 ${f(y)} ${f(x)} ${f(y)}` });
  }
});
