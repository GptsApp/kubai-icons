import { defineIcon, KR, OL, rp, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'sticky-note',
  zh: '便签',
  category: 'files',
  tags: ['note', 'memo', 'post-it'],
  variants: ['plus', 'check', 'x', 'heart', 'star', 'clock'],
  // A sticky note whose folded corner peels further on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="note" fill="${u.loS}"/></g></g><path data-n="noteO" ${OL}/>
    <path d="${lines(8.6, 7.4, [13.8, 9.4])}" class="ln" stroke="#fff" data-w="stroke"/>
    <g filter="${u.hi}"><path data-n="fold" fill="${u.upS}"/></g><path data-n="foldO" ${OL}/>`,
  target: (h) => ({ cut: h ? 9 : 6.4 }),
  draw(p, E) {
    const c = p.cut;
    const note = rp([[5.2, 2.2], [25.8, 2.2], [25.8, 22.8 - c], [25.8 - c, 22.8], [5.2, 22.8]], [KR, KR, 0.6, 0.6, KR]);
    const fold = rp([[25.8, 22.8 - c], [25.8 - c, 22.8], [25.8 - c, 22.8 - c]], [0.5, 0.5, 1.2]);
    at(E.note, { d: note }); at(E.noteO, { d: note }); at(E.fold, { d: fold }); at(E.foldO, { d: fold });
  }
});
