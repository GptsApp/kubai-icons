import { defineIcon, KR, f, OL, DEEPS, rp, rr, lines, at } from '../packages/core/src/kit.js';

const S = 17.4;

export default defineIcon({
  name: 'sticky-notes',
  zh: '便签组',
  category: 'files',
  tags: ['sticky notes', 'notes', 'memos', 'post-its', 'stack', 'board', '便利贴'],
  variants: ['plus', 'check', 'x', 'star'],
  // A stack of two sticky notes; on hover the back note fans out and the front note's corner peels further.
  svg: (u) => `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(0, 0, S, S, KR)}" fill="${u.loS}"/></g></g><path d="${rr(0, 0, S, S, KR)}" ${OL}/></g>
    <g transform="translate(4.6 6.4)"><g filter="${u.sh}"><g filter="${u.hi}"><path data-n="n" fill="${u.up(S)}"/></g></g><path data-n="nO" ${OL}/>
      <path d="${lines(3, 4.6, [11.4, 7.4])}" class="ln" ${DEEPS} stroke-opacity=".55"/>
      <g filter="${u.hi}"><path data-n="fd" fill="${u.loS}"/></g><path data-n="fdO" ${OL}/></g>`,
  target: (h) => ({ cut: h ? 7.4 : 5.4, b: h ? [9.6, 1.4, 7] : [9, 0.8, 0] }),
  draw(p, E) {
    const c = p.cut;
    const note = rp([[0, 0], [S, 0], [S, S - c], [S - c, S], [0, S]], [KR, KR, 0.6, 0.6, KR]);
    const fold = rp([[S, S - c], [S - c, S], [S - c, S - c]], [0.5, 0.5, 1.2]);
    at(E.n, { d: note }); at(E.nO, { d: note }); at(E.fd, { d: fold }); at(E.fdO, { d: fold });
    at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])}) rotate(${f(p.b[2])} 0 ${S})` });
  }
});
