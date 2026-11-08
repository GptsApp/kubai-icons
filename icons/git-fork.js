import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { node, move, MARK } from './_w2-dev.js';

export default defineIcon({
  name: 'git-fork',
  zh: '派生',
  category: 'development',
  tags: ['fork', 'copy', 'repository', 'version control', 'git', '复刻'],
  // One commit splitting into two copies; on hover the two copies draw further apart.
  svg: (u) => `<path data-n="ln" ${MARK}/>
    ${node(u, 'a', 3.2, u.loS)}${node(u, 'b', 3.2, u.loS)}${node(u, 'c', 3.2, u.upS)}`,
  target: (h) => ({ x: h ? 1.2 : 0 }),
  draw(p, E) {
    const l = 9 - p.x, r = 22 + p.x;
    move(E, 'a', l, 4.8); move(E, 'b', r, 4.8); move(E, 'c', 15.5, 20.2);
    at(E.ln, { d: `M${f(l)} 4.8V9.4Q${f(l)} 12 ${f(l + 2.6)} 12H${f(r - 2.6)}Q${f(r)} 12 ${f(r)} 9.4V4.8M15.5 12V20.2` });
  }
});
