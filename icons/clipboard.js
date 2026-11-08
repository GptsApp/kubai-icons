import { defineIcon, KR, CR, f, OL, ACC, DEEP, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'clipboard',
  zh: '剪贴板列表',
  category: 'files',
  tags: ['clipboard', 'list', 'checklist', 'paste', 'form', 'tasks', '清单'],
  variants: ['plus', 'minus', 'x', 'alert', 'info', 'up', 'down', 'right', 'clock', 'star', 'lock', 'search', 'sync', 'sparkle'],
  // A clipboard holding a list; its clip lifts open on hover.
  svg: (u) => {
    const board = rr(6.3, 2.6, 18.4, 21.2, KR), clip = rp(R(11, 0, 9, 4.6), [1.6, 1.6, 1.2, 1.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${board}" fill="${u.loS}"/></g></g><path d="${board}" ${OL}/>
      <path d="${rr(8.6, 6.6, 13.8, 15, CR)}" fill="#fff"/>
      <path d="M11 10.6h0.01M11 15.6h0.01" stroke-width="2.6" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
      <path d="${lines(13.8, 10.6, [6.2])}${lines(13.8, 15.6, [4.6])}" ${ACC}/>
      <g data-n="clip"><g filter="${u.hi}"><path d="${clip}" fill="${u.upS}"/></g><path d="${clip}" ${OL}/></g>`;
  },
  target: (h) => ({ y: h ? -0.6 : 0.8, s: h ? 0.86 : 1 }),
  draw(p, E) { at(E.clip, { transform: `translate(15.5 ${f(p.y + 4.6)}) scale(1 ${f(p.s)}) translate(-15.5 -4.6)` }); }
});
