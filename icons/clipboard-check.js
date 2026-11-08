import { defineIcon, KR, CR, f, OL, LINE, DEEPS, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

// The tick's points at rest and, larger, when ticked.
const CHECK = [[12.2, 11.2], [16.2, 15.6], [14.6, 14.4], [18.6, 19], [19, 20.2], [14, 12.6]];

export default defineIcon({
  name: 'clipboard-check',
  zh: '剪贴板',
  category: 'files',
  tags: ['clipboard', 'task', 'todo', 'done', 'check'],
  // A clipboard; a large check gets ticked across its sheet on hover.
  svg: (u) => {
    const board = rr(6.3, 2.6, 18.4, 21.2, KR), clip = rp(R(11, 0.8, 9, 4.6), [1.6, 1.6, 1.2, 1.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${board}" fill="${u.loS}"/></g></g><path d="${board}" ${OL}/>
      <path d="${rr(8.6, 6.6, 13.8, 15, CR)}" fill="#fff"/>
      <path d="${lines(11, 10.2, [9])}" ${LINE}/>
      <path data-n="chk" d="M12.2 16.2L14.6 18.6L19 14" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.hi}"><path d="${clip}" fill="${u.upS}"/></g><path d="${clip}" ${OL}/>`;
  },
  target: (h) => ({ chk: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.chk)), L = f(9.8 + 3.6 * o);
    const q = CHECK.map(([a, b], i) => f(a + (b - a) * o));
    at(E.chk, { d: `M${q[0]} ${q[1]}L${q[2]} ${q[3]}L${q[4]} ${q[5]}`, 'stroke-dasharray': L, 'stroke-dashoffset': f(L * (1 - o)) });
  }
});
