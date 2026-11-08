import { defineIcon, f, at, scaleAt, bump } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';
import { MARK, plusPath } from './_interface.js';

export default defineIcon({
  name: 'file-diff',
  zh: '文件对比',
  category: 'files',
  tags: ['diff', 'compare', 'changes', 'patch', 'version', 'revision', '差异'],
  variants: FILE_BADGES.filter((b) => b !== 'heart'),
  // A page marked with a plus over a minus, lines added and removed; on hover the plus pops up larger and the minus stretches.
  svg: (u) => typedPage(u, `<path data-n="pl" d="${plusPath(3)}" ${MARK}/><path data-n="mi" ${MARK}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), b = bump(o);
    const s = 1 + 0.22 * o + 0.26 * b, w = 3 + 1 * o + 0.7 * b;
    at(E.pl, { transform: `translate(0 -1.6) ${scaleAt(s, 15.5, 12.5)}` });
    at(E.mi, { d: `M${f(15.5 - w)} 18.4H${f(15.5 + w)}` });
  }
});
