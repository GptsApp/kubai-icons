import { defineIcon, KR, OL, rp, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'file',
  zh: '文档',
  category: 'files',
  tags: ['document', 'page', 'paper', 'text'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'info', 'up', 'down', 'right', 'clock', 'star', 'heart', 'lock', 'search', 'sync', 'cog', 'sparkle', 'bolt'],
  // A page whose folded corner opens a little more on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="pg" fill="${u.loS}"/></g></g><path data-n="pgO" ${OL}/>
    <path d="${lines(9.6, 13.4, [11.8, 8.2])}" class="ln" stroke="#fff" data-w="stroke"/>
    <g filter="${u.hi}"><path data-n="fold" fill="${u.upS}"/></g><path data-n="foldO" ${OL}/>`,
  target: (h) => ({ fold: h ? 8 : 6 }),
  draw(p, E) {
    const c = p.fold;
    const pg = rp([[6.3, 1.5], [24.7 - c, 1.5], [24.7, 1.5 + c], [24.7, 23.5], [6.3, 23.5]], [KR, 0.5, 0.5, KR, KR]);
    const fold = rp([[24.7 - c, 1.5], [24.7, 1.5 + c], [24.7 - c, 1.5 + c]], [0.4, 0.4, 1.2]);
    at(E.pg, { d: pg }); at(E.pgO, { d: pg }); at(E.fold, { d: fold }); at(E.foldO, { d: fold });
  }
});
