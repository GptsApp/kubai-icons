import { defineIcon, f, OL, WHITES, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'scroll',
  zh: '卷轴',
  category: 'files',
  tags: ['scroll', 'parchment', 'document', 'script', 'history', 'decree', '卷轴'],
  variants: ['plus', 'check', 'x', 'star', 'lock', 'sparkle'],
  // A paper scroll between two rollers; it unrolls a little further on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="sheet" fill="${u.loS}"/></g></g><path data-n="sheetO" ${OL}/>
    <path d="${lines(10.8, 10.6, [9.4, 6.4])}" class="ln" ${WHITES}/>
    <g data-n="top"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(4.6, 0, 21.8, 4, 2)}" fill="${u.upS}"/></g></g><path d="${rr(4.6, 0, 21.8, 4, 2)}" ${OL}/></g>
    <g data-n="bot"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(4.6, 0, 21.8, 4, 2)}" fill="${u.upS}"/></g></g><path d="${rr(4.6, 0, 21.8, 4, 2)}" ${OL}/></g>`,
  target: (h) => ({ t: h ? 0.8 : 2.2, b: h ? 20.2 : 18.8 }),
  draw(p, E) {
    const d = rp(R(7.4, p.t + 2, 16.2, p.b - p.t), 0.6);
    at(E.sheet, { d }); at(E.sheetO, { d });
    at(E.top, { transform: `translate(0 ${f(p.t)})` }); at(E.bot, { transform: `translate(0 ${f(p.b)})` });
  }
});
