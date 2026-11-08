import { defineIcon, f, DEEP, at } from '../packages/core/src/kit.js';
import { node, move, head, MARK } from './_w2-dev.js';

const FLIP = 'rotate(180 15.5 12.5)';

export default defineIcon({
  name: 'git-compare',
  zh: '比较',
  category: 'development',
  tags: ['compare', 'diff', 'changes', 'version control', 'git', '差异', '对比'],
  // Two commits, each with an arrow bending across to the other; on hover both arrows reach
  // further over.
  svg: (u) => `<g data-n="a1"><path data-n="s1" ${MARK}/><path data-n="h1" ${DEEP}/></g>
    <g transform="${FLIP}"><path data-n="s2" ${MARK}/><path data-n="h2" ${DEEP}/></g>
    ${node(u, 'a', 3.2, u.loS)}${node(u, 'b', 3.2, u.upS)}`,
  target: (h) => ({ t: h ? 13.2 : 14.4 }),
  draw(p, E) {
    move(E, 'a', 8.2, 6.2); move(E, 'b', 22.8, 18.8);
    const s = `M22.8 15.6V9Q22.8 6.2 20 6.2H${f(p.t + 2.8)}`, hd = head(p.t, 6.2, 180);
    at(E.s1, { d: s }); at(E.h1, { d: hd }); at(E.s2, { d: s }); at(E.h2, { d: hd });
  }
});
